import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class PokeId {
    results: Object[];
    loading: boolean;
    constructor(private http: Http) {
        this.results = [];
        this.loading = false;
    }

    getPoke(id: string) {
        let promise = new Promise((resolve, reject) => {
            this.http.get('https://pokeapi.co/api/v2/pokemon/'+id)
                .toPromise()
                .then(
                    res => { // Success
                        console.log(res.json());
                        resolve();
                    }
                );
        });
        return promise;
    }
}