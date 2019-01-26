import {Subject} from 'rxjs';

export class HttpClient {

    public get(url: string) {
        const result$ = new Subject();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = (req: ProgressEvent) => {
            if (xhr.readyState === 4) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    result$.next(data);
                } catch (e) {
                    result$.next(xhr.responseText);
                }
            }
        };
        xhr.send(null);

        return result$.asObservable();
    }
    public post(url: string, data: any) {
        const result$ = new Subject();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = (req: ProgressEvent) => {
            if (xhr.readyState === 4) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    result$.next(responseData);
                } catch (e) {
                    result$.next(xhr.responseText);
                }
            }
        };
        xhr.send(data);

        return result$.asObservable();
    }
}
