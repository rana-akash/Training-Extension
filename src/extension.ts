// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import {VerifyRequest, VerifyRequestStatic, VerifyResponseRootStatic} from './VerifyRequest';
import { stringify } from 'querystring';
import { ILPRequest, ILPConstants, AnotherILPRequest, ILPRequestNew } from './ILPRequest';
import { LexRequest, LexRequestConstants } from './LexRequest';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let responseString:string = "";
let responsePayload:any;
let statusCode:number;

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "pyverify" is now active!');

		let currentPanel: vscode.WebviewPanel | undefined = undefined;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World!');
	// });

	let disposable = vscode.commands.registerCommand('pyverify.Show', () => {

		if (currentPanel) {
			currentPanel.reveal(vscode.ViewColumn.Beside);
		}
		else {
			vscode.window.setStatusBarMessage("Contacting lex servers",3000);
			let config = vscode.workspace.getConfiguration();
			
			config.update('workbench.colorCustomizations.statusBar.background','#FFD700',vscode.ConfigurationTarget.Workspace);
			
			currentPanel = vscode.window.createWebviewPanel('viewType', 'Verification', vscode.ViewColumn.Beside, {
				// Only allow the webview to access resources in our extension's resource directory
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'src/resource'))],
				enableScripts: true,
				retainContextWhenHidden: true
			});

			currentPanel.webview.html =
				getWebviewContent(context, 'requestSend');

			if(!getWorkspaceInfo(context)){
				vscode.window.showErrorMessage("Process Aborted");
			}

			// let reqObj:VerifyRequest = {
			// 	UserId : VerifyRequestStatic.userId,
			// 	Code : VerifyRequestStatic.userSolution,
			// 	QpName : VerifyRequestStatic.hashTag
			// };

			// let reqObj:ILPRequestNew = {
			// 	asgnmtId: ILPRequest.assignmentId,
			// 	UserSolution: ILPRequest.userSolution,
			// 	CourseShortName: ILPRequest.courseName,
			// 	AsgnmtTyp: ILPRequest.assignmentType,
			// 	SolutionFileName: ILPRequest.solutionFileName,
			// 	TestcaseFileName: "",
			// 	HashTag: ILPRequest.hashTag
			// };

			// let reqObj2:AnotherILPRequest ={
			// 	handsOnType: ILPConstants.ILPRequestHandsOnType,
			// 	moduleName: ILPConstants.ILPRequestModuleName,
			// 	requestType: ILPConstants.ILPRequestVerifyRequestType,
			// 	JSONInput: JSON.stringify(reqObj)
			// };

			let realReq:LexRequest = {
				user_solution: ILPRequest.userSolution,
				user_id_type: "email"
			};

			//fetchServerinfo();
			reqLexServers(realReq);

			//VerifyCode(reqObj);

			// if (responseString !== ""){
			// 	StoreResponse(context,responseString);
			// }

			const timeout = setTimeout(() => {
				if (currentPanel){
					if (statusCode===200) {
					currentPanel.webview.html =
						getWebviewContent(context, 'testResultsOverview');
				    }
				else{
					currentPanel.dispose();
				    }
			    }
			}, 3000);

			currentPanel.onDidDispose(
				() => {
					currentPanel = undefined;
					clearTimeout(timeout);
				},
				null,
				context.subscriptions
			);

			currentPanel.webview.onDidReceiveMessage(
				message => {
					switch (message.command) {
						case 'cancelOperation':
							if (currentPanel) {
								currentPanel.dispose();
							}
							return;

						case 'showQuality':
							if (currentPanel){
								currentPanel.webview.html =getWebviewContent(context, 'codeQualityResults');
							}
							break;

						case 'showLogical':
							if (currentPanel){
								currentPanel.webview.html =getWebviewContent(context, 'logicalTestCaseResults');
							}
							break;

						case 'showStructural':
							if (currentPanel){
								currentPanel.webview.html =getWebviewContent(context, 'structuralTestCaseResults');
							}
							break;

						case 'goBack':
							console.log("Back message received from HTML");
							if (currentPanel){
								currentPanel.webview.html =getWebviewContent(context, 'testResultsOverview');
							}
							break;

						case 'fetchResponseStructural':
						if (currentPanel){
							let testData = responsePayload.TestResultData;
							let structuralObj:any = testData.filter(function(item:any){
								return item.Type==="Structural";
							});

							currentPanel.webview.postMessage({
								command:'initialize',
								data: structuralObj
							});
							}
							break;

						case 'fetchResponseQuality':
						if (currentPanel){
							let qualityData = responsePayload.CodeAnalyzerDetails;
							currentPanel.webview.postMessage({
								command:'initialize',
								data: qualityData
							});
							}
							break;

						case 'fetchResultsOverview':
						if (currentPanel){
							let numStats = responsePayload.NumericalStatistics;
							let qualityData = responsePayload.CodeAnalyzerDetails;

							let filteredQuality = qualityData.filter(function(item:any){
								return item.Status==="No Violation Found";
							});

							let overviewObj:any = {
								LogicalPercentage: (numStats.LogicalTestCasesPassed/numStats.TotalLogicalTestCases)*100,
								StructuralPercentage: (numStats.StructuralTestCasesPassed/numStats.TotalStructuralTestCases)*100,
								QualityPercentage: (filteredQuality.length/qualityData.length)*100,
								TotalPercentage: (numStats.TotalCasesPassed/numStats.TotalTestCases)*100
							};

							currentPanel.webview.postMessage({
								command:'initialize',
								data: overviewObj
							});
							}
							break;

						case 'fetchResponseLogical':
						if (currentPanel){
							let testData = responsePayload.TestResultData;
							let logicalObj:any = testData.filter(function(item:any){
								return item.Type==="Logical";
							});
							currentPanel.webview.postMessage({
								command:'initialize',
								data: logicalObj
							});
							}
							break;
					}
				},
				undefined,
				context.subscriptions
			);
		}
	});

	context.subscriptions.push(disposable);
}


function getWebviewContent(context: vscode.ExtensionContext, fileName: string) {

	const onDiskPath = vscode.Uri.file(
		path.join(context.extensionPath, 'src/resource', fileName + '.html')
	);

	//const webViewAppSrc = onDiskPath.with({ scheme: 'vscode-resource' });
	let fs = require('fs');
	let content = fs.readFileSync(onDiskPath.fsPath, 'utf-8');
	return content;
}

//#region  HackathonCode
// function getWorkspaceInfo(context: vscode.ExtensionContext){
// 	let fileContent:string = "";

// 	try{
// 		let fs = require('fs');
// 		let activeEditor = vscode.window.activeTextEditor;
// 			if(activeEditor){

// 				fileContent = activeEditor.document.getText();
// 				let firstLine = fileContent.split('\n')[0];

// 				//console.log("The first line of the file is: ",firstLine);
// 				//console.log("Valid Hashtag");
					
// 				VerifyRequestStatic.hashTag = firstLine;
// 				VerifyRequestStatic.userSolution = fileContent;
// 				VerifyRequestStatic.userId = "Vishal.Drama"; //change later to read from system

// 				console.log("userSolution: ",fileContent);
// 				return true;
// 			}
// 	}
// 	catch(ex){
// 		return false;
// 	}
// }

// function VerifyCode(reqObj: VerifyRequest){
// 	try{
// 		var http = require('http');

// 		// var post_options={
// 		// 	host: 'localhost', // change to azurewebsites.net
// 		// 	port: 1338,
// 		// 	path: '/api/execute',
// 		// 	method: 'POST',
// 		// 	headers: {
// 		// 		'Content-Type': 'application/json'
// 		// 	}
// 		// };

// 		var post_options={
// 			host: 'pyverify.azurewebsites.net', // change to azurewebsites.net
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 		};

// 		console.log("Sending request");

// 		var request = http.request(post_options, (res: any)=> {
// 			//res.setEncoding("utf-8");
// 			//responseString = "";

// 			res.on('data',(chunk: any)=> {
// 				responseString += chunk;
// 			});

// 			res.on('end',()=>{
// 				console.log("Finished receiving response. Response body is: "+responseString);
// 			});
// 		});
		
// 		reqObj.Code = reqObj.Code.replace(new RegExp('\r', 'g'),'');
// 		reqObj.QpName =reqObj.QpName.replace(new RegExp('\r', 'g'),'');
// 		reqObj.QpName = reqObj.QpName.trim();

// 		request.write(JSON.stringify(reqObj));
// 		request.end();
// 	}
// 	catch(ex){
// 		return "";
// 	}
// }

// function StoreResponse(context: vscode.ExtensionContext,responseString: string){
// 	// store in a file
// 	const onDiskPath = vscode.Uri.file(
// 		path.join(context.extensionPath, 'src/resource', 'lastVerifiedDetails.json')
// 	);
// 	let fs = require('fs');
// 	fs.Write(responseString);

// 	//store as a static object
// 	var responseObj = JSON.parse(responseString);
// }
//#endregion

// this method is called when your extension is deactivated
export function deactivate() { }



function getWorkspaceInfo(context: vscode.ExtensionContext){
	let fileContent:string = "";
	var filePath: undefined;
	try{
		let fs = require('fs');
		let activeEditor = vscode.window.activeTextEditor;
			if(activeEditor){

				ILPRequest.filePath = activeEditor.document.uri.toString();
				ILPRequest.solutionFileName = activeEditor.document.fileName;

				console.log("The URI of the file is: ",ILPRequest.filePath);

				fileContent = activeEditor.document.getText();
				let firstLine = fileContent.split('\n')[0];

				console.log("The first line of the file is: ",firstLine);
				ILPRequest.userSolution = fileContent;
				return true;

				if (firstLine.match(ILPConstants.VerifyUserSolutionFirstLinePattern)){
					console.log("first line pattern matched with ",ILPConstants.VerifyUserSolutionFirstLinePattern);
					
					ILPRequest.hashTag = firstLine;
					
					let firstLineSplit = firstLine.split('#')[1].split('-');
					console.log("firstLineSplit: ",firstLineSplit);
					ILPRequest.assignmentId = firstLineSplit[firstLineSplit.length-1].trim();

					//ILPRequest.userSolution = fileContent;
					ILPRequest.courseName = firstLineSplit[0];
					ILPRequest.assignmentType = firstLineSplit[1].charAt(0);
					ILPRequest.verifyType = ILPConstants.VerifyRequestType;

					console.log("userSolution: ",fileContent);
					console.log("courseName: ",ILPRequest.courseName);
					console.log("assignmentType: ",ILPRequest.assignmentType);
					console.log("verifyType: ",ILPRequest.verifyType);

					return true;
				}
				return false;
			}
	}
	catch(ex){
		return false;
	}
}


async function fetchServerinfo(){
	let connection;
	try{
		var oracledb = require('oracledb');
		connection = oracledb.getConnection({
		user: 'enrassment',
		password: 'infy',
		connectString: 'jdbc:oracle:thin:@10.123.79.58:1521:georli03'
	});

	var result = await connection.execute("select KeyValue from Table_tools_config where KeyName='ILPWSSUBMIT_5'");
	console.log(result.rows[0]);
	
	}
	catch(ex){
		console.log(ex.message);
	}
	finally{
		connection.close();
	}
}


function reqLexServers(reqObj: LexRequest){
	try{
		var http = require('http');

		var post_options={
			host: LexRequestConstants._req_host,
			port: LexRequestConstants._req_port,
			path: LexRequestConstants._req_path,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Client_Id': LexRequestConstants._client_id,
				'Api_Key': LexRequestConstants._api_key
			}
		};

		console.log("Sending request");

		var request = http.request(post_options, (res: any)=> {
			//res.setEncoding("utf-8");
			let responseString:string = "";
			console.log(`statusCode: ${res.statusCode}`)
			statusCode=res.statusCode;

			res.on('data',(chunk: any)=> {
				responseString += chunk;
				//console.log("Response body is: ",responseString);
			});

			res.on('end',()=>{
				responsePayload = JSON.parse(JSON.parse(responseString).verifyResult);
			});
		});

		let stringifiedObject = JSON.stringify(reqObj);
		request.write(stringifiedObject);
		request.end();
	}
	catch(ex){
	}
}