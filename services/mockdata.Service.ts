import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class MockDataService {
    headers = {
        "Content-Type": "application/json"
    };
    constructor(private _Http: HttpClient) {
    }
    getSampleData(): Observable<any> {
        return this._Http.get('assets/json/sampleData.json');
    }
}