export class VerifyRequest{
    UserId:string ="";
    Code:string="";
    QpName:string="";
}

export class VerifyRequestStatic{
    
    private static _userId : string;
    private static _userSolution : string;
    private static _hashTag: string;


    
constructor() {
        VerifyRequestStatic._userId = "";
        VerifyRequestStatic._userSolution = "";
        VerifyRequestStatic._hashTag = "";
    }
    public static get hashTag() : string {
        return VerifyRequestStatic._hashTag;
    }
    public static set hashTag(v : string) {
        VerifyRequestStatic._hashTag = v;
    }

    public static get userId() : string {
        return VerifyRequestStatic._userId;
    }
    public static set userId(v : string) {
        VerifyRequestStatic._userId = v;
    }
    
    public static get userSolution() : string {
        return VerifyRequestStatic._userSolution;
    }
    public static set userSolution(v : string) {
        VerifyRequestStatic._userSolution = v;
    }
    

}


export class VerifyResponseSuggestionStatic{

    private static _testCaseName: string;
    private static _lastNotVerified: string;
    private static _lastNotVerifiedTimestamp: number;
    private static _firstVerified: string;
    private static _firstVerifiedTimestamp: number;
    private static _methodSignature: string;
    private static _suggestionId: number;

    constructor(){
        VerifyResponseSuggestionStatic._testCaseName = "";
        VerifyResponseSuggestionStatic._lastNotVerified = "";
        VerifyResponseSuggestionStatic._lastNotVerifiedTimestamp = Date.now();
        VerifyResponseSuggestionStatic._firstVerified = "";
        VerifyResponseSuggestionStatic._firstVerifiedTimestamp = Date.now();
        VerifyResponseSuggestionStatic._methodSignature = "";
        VerifyResponseSuggestionStatic._suggestionId = 0;
    }

    public static get methodSignature() : string {
        return VerifyResponseSuggestionStatic._methodSignature;
    }

    public static set methodSignature(v : string) {
        VerifyResponseSuggestionStatic._methodSignature = v;
    }

    public static get testCaseName() : string {
        return VerifyResponseSuggestionStatic._testCaseName;
    }

    public static set testCaseName(v : string) {
        VerifyResponseSuggestionStatic._testCaseName = v;
    }

    public static get lastNotVerified() : string {
        return VerifyResponseSuggestionStatic._lastNotVerified;
    }

    public static set lastNotVerified(v : string) {
        VerifyResponseSuggestionStatic._lastNotVerified = v;
    }

    public static get lastNotVerifiedTimestamp() : number {
        return VerifyResponseSuggestionStatic._lastNotVerifiedTimestamp;
    }

    public static set lastNotVerifiedTimestamp(v : number) {
        VerifyResponseSuggestionStatic._lastNotVerifiedTimestamp = v;
    }

    public static get firstVerified() : string {
        return VerifyResponseSuggestionStatic._firstVerified;
    }

    public static set firstVerified(v : string) {
        VerifyResponseSuggestionStatic._firstVerified = v;
    }

    public static get firstVerifiedTimestamp() : number {
        return VerifyResponseSuggestionStatic._firstVerifiedTimestamp;
    }

    public static set firstVerifiedTimestamp(v : number) {
        VerifyResponseSuggestionStatic._firstVerifiedTimestamp = v;
    }

    public static get suggestionId() : number {
        return VerifyResponseSuggestionStatic._suggestionId;
    }

    public static set suggestionId(v : number) {
        VerifyResponseSuggestionStatic._suggestionId = v;
    }


}

export class VerifyResponseStructuralTestCase{
    private static _methodSignature: string;
    private static _isPassed: boolean;

    constructor(){
        VerifyResponseStructuralTestCase._methodSignature = "";
        VerifyResponseStructuralTestCase._isPassed = false;
    }

    public static get methodSignature() : string {
        return VerifyResponseStructuralTestCase._methodSignature;
    }

    public static set methodSignature(v : string) {
        VerifyResponseStructuralTestCase._methodSignature = v;
    }

    public static get isPassed() : boolean {
        return VerifyResponseStructuralTestCase._isPassed;
    }

    public static set isPassed(v : boolean) {
        VerifyResponseStructuralTestCase._isPassed = v;
    }


}


export class VerifyResponseLogicalTestCase{
    private static _methodSignature: string;
    private static _testCaseName: string;
    private static _isPassed: boolean;
    private static _actual: string;
    private static _expected: string;

    constructor(){
        VerifyResponseLogicalTestCase._methodSignature = "";
        VerifyResponseLogicalTestCase._testCaseName = "";
        VerifyResponseLogicalTestCase._isPassed = false;
        VerifyResponseLogicalTestCase._actual = "";
        VerifyResponseLogicalTestCase._expected = "";
    }

    public static get testCaseName() : string {
        return VerifyResponseLogicalTestCase._testCaseName;
    }

    public static set testCaseName(v : string) {
        VerifyResponseLogicalTestCase._testCaseName = v;
    }

    public static get methodSignature() : string {
        return VerifyResponseLogicalTestCase._methodSignature;
    }

    public static set methodSignature(v : string) {
        VerifyResponseLogicalTestCase._methodSignature = v;
    }

    public static get isPassed() : boolean {
        return VerifyResponseLogicalTestCase._isPassed;
    }

    public static set isPassed(v : boolean) {
        VerifyResponseLogicalTestCase._isPassed = v;
    }

    public static get actual() : string {
        return VerifyResponseLogicalTestCase._actual;
    }

    public static set actual(v : string) {
        VerifyResponseLogicalTestCase._actual = v;
    }
    public static get expected() : string {
        return VerifyResponseLogicalTestCase._expected;
    }

    public static set expected(v : string) {
        VerifyResponseLogicalTestCase._expected = v;
    }
}

export class VerifyResponseRootStatic{

    private static _suggestions: VerifyResponseSuggestionStatic[];
    private static _structural: VerifyResponseStructuralTestCase[];
    private static _logical: VerifyResponseLogicalTestCase[];
    private static _hashTag: string;

    public static get hashTag() : string {
        return VerifyResponseRootStatic._hashTag;
    }
    public static set hashTag(v : string) {
        VerifyResponseRootStatic._hashTag = v;
    }

    public static get logical() : VerifyResponseLogicalTestCase[] {
        return VerifyResponseRootStatic._logical;
    }
    public static set logical(v : VerifyResponseLogicalTestCase[]) {
        VerifyResponseRootStatic._logical = v;
    }

    public static get structural() : VerifyResponseStructuralTestCase[] {
        return VerifyResponseRootStatic._structural;
    }
    public static set structural(v : VerifyResponseStructuralTestCase[]) {
        VerifyResponseRootStatic._structural = v;
    }

    public static get suggestions() : VerifyResponseSuggestionStatic[] {
        return VerifyResponseRootStatic._suggestions;
    }
    public static set suggestions(v : VerifyResponseSuggestionStatic[]) {
        VerifyResponseRootStatic._suggestions = v;
    }

}
