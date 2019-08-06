import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MessageService } from '../service/message.service';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.page.html',
    styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

    public drivers: Array<{}>;

    constructor(public api: ApiService,
                public message: MessageService,
                ) { }

    ngOnInit() {
        this.getDrivers();
    }

    async getDrivers() {
        await this.message.showLoading('Carregando pilotos', 'loading-driver');
        this.api.get('2019/driverStandings.json').subscribe(
            data => {
                const json = data['MRData']['StandingsTable']['StandingsLists'][0];
                this.drivers = json['DriverStandings'];
                this.message.hideLoading('loading-driver');
            },
            err => {
                this.message.alert('Atenção', 'Ocorreu um erro ao buscar os pilotos.', 'OK');
                this.message.hideLoading('loading-driver');
            },
            () => {
            }
        );
    }

}
