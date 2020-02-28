export class ILPConstants{
    public static VerifyUserSolutionFirstLinePattern: string = "(\\s)*#(\\s)*(PF|OOP|OOPR|DSA|PBL[0-9]*|USM[0-9]*|SCM[2-3]|FSM[0-9])(\\s)*(-)(\\s)*(Assgn|Exer|Prac)(\\s)*(-)(\\s)*[1-9][0-9]{0,4}(\\s)*";
    public static VerifyUserSolutionTryoutFirstLinePattern: string = "(\\s)*#(\\s)*(PF|OOP|OOPR|DSA|PBL[0-9]*|USM[0-9]*|SCM[2-3]|FSM[0-9])(\\s)*(-)(\\s)*(Tryout)(\\s)*";
    public static VerifyRequestType: string = "VerifySolution";
    public static ReadUserInfoSuccess: string ="SUCCESS";
    public static ReadUserInfoFailure: string ="FAILURE";
    public static ILPRequestHandsOnType = "Assignment";
    public static ILPRequestModuleName = "Programming";
    public static ILPRequestVerifyRequestType = "VerifySolution";
}


export class ILPRequestConstants{
    public static _assignmentId: string = "asgnmtId";
    public static _userSolution:string = "UserSolution";
    public static _courseName: string = "CourseShortName";
    public static _testCases: string ="TestCaseSolution";
    public static _assignmentType: string="AsgnmtTyp";
    public static _solutionFileName:string = "SolutionFileName";
    public static _testCaseFileName:string = "TestcaseFileName";
    public static _hashTag:string = "HashTag";
}

export class AnotherILPRequest{
    handsOnType:string ="";
    moduleName:string="";
    requestType:string="";
    JSONInput:string="";
}


export class ILPRequestNew{
    
    asgnmtId : string = "";
    // public get asgnmtId() : string {
    //     return this._asgnmtId;
    // }
    // public set asgnmtId(v : string) {
    //     this._asgnmtId = v;
    // }

    
    UserSolution : string ="";
    // public get UserSolution() : string {
    //     return this._UserSolution;
    // }
    // public set UserSolution(v : string) {
    //     this._UserSolution = v;
    // }
    
    
    CourseShortName : string ="";
    // public get CourseShortName() : string {
    //     return this._CourseShortName;
    // }
    // public set CourseShortName(v : string) {
    //     this._CourseShortName = v;
    // }
    
    
    // private _TestCaseSolution : string = "";
    // public get TestCaseSolution() : string {
    //     return this._TestCaseSolution;
    // }
    // public set TestCaseSolution(v : string) {
    //     this._TestCaseSolution = v;
    // }
    
    
    AsgnmtTyp : string ="";
    // public get AsgnmtTyp() : string {
    //     return this._AsgnmtTyp;
    // }
    // public set AsgnmtTyp(v : string) {
    //     this._AsgnmtTyp = v;
    // }
    
    
    SolutionFileName : string = "";
    // public get SolutionFileName() : string {
    //     return this._SolutionFileName;
    // }
    // public set SolutionFileName(v : string) {
    //     this._SolutionFileName = v;
    // }
    
    
    TestcaseFileName : string = "";
    // public get TestcaseFileName() : string {
    //     return this._TestcaseFileName;
    // }
    // public set TestcaseFileName(v : string) {
    //     this._TestcaseFileName = v;
    // }

    
    HashTag : string ="";
    // public get HashTag() : string {
    //     return this._HashTag;
    // }
    // public set HashTag(v : string) {
    //     this._HashTag = v;
    // }

    constructor() {
    }

}


export class ILPRequest{
    
    private static _assignmentId : string;
    private static _userSolution : string;
    private static _testCases : string;
    private static _courseName : string;
    private static _filePath : string;
    private static _fileLastModified : number;
    private static _verifyType: string;
    private static _isFileVerified: boolean = false;
    private static _isFileSubmitted: boolean = false;
    private static _assignmentType: string;
    private static _solutionFileName: string;
    private static _testCaseFileName: string;
    private static _hashTag: string;


    constructor() {
        ILPRequest._assignmentId = "";
        ILPRequest._userSolution = "";
        
    }

    public static get hashTag() : string {
        return ILPRequest._hashTag;
    }
    public static set hashTag(v : string) {
        ILPRequest._hashTag = v;
    }

    public static get testCaseFileName() : string {
        return ILPRequest._testCaseFileName;
    }
    public static set testCaseFileName(v : string) {
        ILPRequest._testCaseFileName = v;
    }

    public static get solutionFileName() : string {
        return ILPRequest._solutionFileName;
    }
    public static set solutionFileName(v : string) {
        ILPRequest._solutionFileName = v;
    }

    public static get assignmentType() : string {
        return ILPRequest._assignmentType;
    }
    public static set assignmentType(v : string) {
        ILPRequest._assignmentType = v;
    }

    public static get isFileSubmitted() : boolean {
        return ILPRequest._isFileSubmitted;
    }
    public static set isFileSubmitted(v : boolean) {
        ILPRequest._isFileSubmitted = v;
    }

    public static get isFileVerified() : boolean {
        return ILPRequest._isFileVerified;
    }
    public static set isFileVerified(v : boolean) {
        ILPRequest._isFileVerified = v;
    }


    public static get verifyType() : string {
        return ILPRequest._verifyType;
    }
    public static set verifyType(v : string) {
        ILPRequest._verifyType = v;
    }

    public static get fileLastModified() : number {
        return ILPRequest._fileLastModified;
    }
    public static set fileLastModified(v : number) {
        ILPRequest._fileLastModified = v;
    }
    

    public static get filePath() : string {
        return ILPRequest._filePath;
    }
    public static set filePath(v : string) {
        ILPRequest._filePath = v;
    }
    

    public static get  courseName() : string {
        return ILPRequest._courseName;
    }
    public static set courseName(v : string) {
        ILPRequest._courseName  = v;
    }
    

    public static get testCases() : string {
        return ILPRequest._testCases;
    }
    public static set testCases(v : string) {
        ILPRequest._testCases = v;
    }
    
    public static get userSolution() : string {
        return ILPRequest._userSolution;
    }
    public static set userSolution(v : string) {
        ILPRequest._userSolution = v;
    }
    
    public static get assignmentId() : string {
        return ILPRequest._assignmentId;
    }
    public static set assignmentId(v : string) {
        ILPRequest._assignmentId = v;
    }

}