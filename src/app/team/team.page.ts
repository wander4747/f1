import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MessageService } from '../service/message.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

    public teams: Array<{}>;

    constructor(public api: ApiService,
                public message: MessageService) { }

    ngOnInit() {
        this.getTeamResults();
    }

    async getTeamResults() {
        await this.message.showLoading('Carregando...', 'loading-teams');
        this.api.get('2019/constructorStandings.json').subscribe(
            data => {
                const json = data['MRData']['StandingsTable']['StandingsLists'][0];
                this.teams = json['ConstructorStandings'];
                this.message.hideLoading('loading-teams');
            },
            err => {
                this.message.alert('Atenção', 'Ocorreu um erro ao buscar as equipes.', 'OK');
                this.message.hideLoading('loading-teams');
            },
            () => {
            }
        );
    }
}
