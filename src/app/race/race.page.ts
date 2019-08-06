import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';
import { DataPageService } from '../service/data-page.service';

@Component({
    selector: 'app-race',
    templateUrl: './race.page.html',
    styleUrls: ['./race.page.scss'],
})
export class RacePage implements OnInit {

    public futureRaces;
    public pastRaces;
    public image = '/assets/blank.png';

    constructor(public api: ApiService,
                public message: MessageService,
                public router: Router,
                public dataPage: DataPageService) {

        this.getRaces();
    }

    ngOnInit() {
    }

    async getRaces() {
        const today = new Date().toISOString().slice(0, 10);
        const pastRaces = [];
        const futureRaces = [];
        await this.message.showLoading('Carregando...', 'loading-race');
        this.api.get('2019.json').subscribe(
            data => {
                const json = data['MRData']['RaceTable']['Races'];
                json.forEach(function (value) {
                    if (value['date'] < today) {
                        pastRaces.push(value);
                    }
                    if (value['date'] > today) {
                        futureRaces.push(value);
                    }
                });
                this.futureRaces = futureRaces;
                this.pastRaces = pastRaces;
                this.message.hideLoading('loading-race');
            },
            err => {
                this.message.alert('Atenção', 'Ocorreu um erro ao buscar as corridas.', 'OK');
                this.message.hideLoading('loading-race');
            },
            () => {
            }
        );
    }
}
