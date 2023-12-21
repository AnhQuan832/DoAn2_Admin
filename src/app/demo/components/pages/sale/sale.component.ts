import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
    selector: 'app-sale',
    templateUrl: './sale.component.html',
    styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
    lineData;
    rangeDates;
    statOption = [
        // {
        //     id: 'day',
        //     name: 'Today',
        // },
        {
            id: 'week',
            name: 'This Week',
        },
        {
            id: 'month',
            name: 'This Month',
        },
        {
            id: 'year',
            name: 'This Year',
        },
        {
            id: 'SPECIFIC',
            name: 'Specicfic Day',
        },
    ];
    selectedOption = null;
    constructor(private statisticService: StatisticService) {}

    ngOnInit(): void {
        const params = {
            fromDate: moment()
                .clone()
                .startOf('week')
                .set({ hour: 7, minute: 0, second: 0, millisecond: 0 }),
            toDate: moment().clone().endOf('week'),
            groupType: 'DAY',
        };
        this.getData(params);
    }
    initChart(data) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const reportTime = data.map((i) =>
            moment(i.reportTime).format('DD/MM')
        );
        const totalSell = data.map((i) => i.totalSell);
        const totalImport = data.map((i) => i.totalImport);
        this.lineData = {
            labels: reportTime,
            datasets: [
                {
                    label: 'Total Sell',
                    data: totalSell,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    tension: 0.4,
                },
                {
                    label: 'Total Import',
                    data: totalImport,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--teal-400'),
                    borderColor: documentStyle.getPropertyValue('--teal-400'),
                    tension: 0.4,
                },
            ],
        };
    }

    onDateChange() {
        const params = {
            fromDate: moment(this.rangeDates[0]).set({
                hour: 7,
                minute: 0,
                second: 0,
                millisecond: 0,
            }),
            toDate: moment(this.rangeDates[1]).set({
                hour: 7,
                minute: 0,
                second: 0,
                millisecond: 0,
            }),
            groupType: 'DAY',
        };
        this.getData(params);
    }

    getData(params) {
        this.statisticService.getData(params).subscribe({
            next: (res) => {
                this.initChart(res);
            },
        });
    }

    onOptionChange() {
        if (this.selectedOption.id !== 'SPECIFIC') {
            this.rangeDates = null;
            const params = {
                fromDate: moment()
                    .clone()
                    .startOf(this.selectedOption.id)
                    .set({ hour: 7, minute: 0, second: 0, millisecond: 0 }),
                toDate: moment().clone().endOf(this.selectedOption.id),
                groupType: this.selectedOption.id === 'year' ? 'MONTH' : 'DAY',
            };
            this.getData(params);
        }
    }
}
