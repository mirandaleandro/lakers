module lakers {

    export interface IProject {
        id:string;
        name:string;
        workNotes:string;
        pages:Array<IPage>;
    }

    export interface IPage {
        startDateTime:Date;
        url:string;
        pageId:string;
        onContentLoad:number;
        onLoad:number;
        entries:Array<IEntry>;
    }

    export interface IEntry {
        id:string;
        startedDateTime: Date;
        time: number;
        pageRef:string;
        request: IRequest
        response: IResponse
        timings: ITiming
    }

    export interface IRequest{
        id: string;
        bodySize: number;
        cookiesCount: number;
        headersCount: number;
        headersSize: number;
        method: string;
        queryStringCount: number;
        url: string;
    }

    export interface IResponse{
        id: string;
        bodySize: number;
        contentSize: number;
        headersSize: number;
        mimeType: string;
        redirectUrl: string;
        status: number;
        statusText: string;
        transferSize: number;
    }

    export interface ITiming{
        id: string;
        blocked: number;
        connect: number;
        dns: number;
        receive: number;
        send: number;
        ssl: number;
        waitTime: number;
    }

    export interface IProjectService {
        currentProject:IProject
        getFastestEntries(page:IPage, top:number):Array<IEntry>
        getSlowestEntries(page:IPage, top:number):Array<IEntry>
    }

    export interface IProjectApi {
        postHarPage(harPageModel:any)
        getProjectWithId(projectId:string)
    }

}
