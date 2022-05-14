import { LightningElement, track, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD  from '@salesforce/schema/Account.Fax';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Website';

const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' }
];
const COLUMNS = [
    {label: 'Nome', fieldName: NAME_FIELD.fieldApiName, type : 'text', hideDefaultActions: true},
    {label:'CPF/CNPJ', fieldName : REVENUE_FIELD.fieldApiName, type : 'text', hideDefaultActions: true},
    {label : 'Tipo', fieldName : INDUSTRY_FIELD.fieldApiName, type : 'text', hideDefaultActions: true},
    {type : 'action', typeAttributes: { rowActions: actions }}
];
export default class ListarGruposGarantidor extends LightningElement {
    @api recordId;
    columns = COLUMNS;
    
    criarGrupos= true;
    ListaGrupoCriados = false;
    mostraGrupos = true;

    @track isModalOpen = false;
    
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = false;
    }

    @wire(getAccounts)
    accounts;

    get options() {
        return [
            { label: '001244_PF_THALITA_REBOUCAS_16693332056', value: '001244_PF_THALITA_REBOUCAS_16693332056' },
            { label: 'In 002280_PF_DORMANI_LUIZ_BRAGA_61666095079', value: '002280_PF_DORMANI_LUIZ_BRAGA_61666095079' },
            { label: '003880_PJ_SW_LUZ_44272283000104', value: '003880_PJ_SW_LUZ_44272283000104' },
        ];
    }
    handleChange(event) {
        this.value = event.detail.value;
    }
    handleRowActions(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch (actionName) {
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            case 'delete':
                this.deleteRow(row);
                break;
        }
    }
    removeRowFromTable(){
        const { Id } = this.rowToDelete;
        const index = findRowIndexById(Id, this.contacts);
        if (index !== -1) {
            if (index !== -1) {
                this.contacts = this.contacts.slice(0, index).concat(this.contacts.slice(index + 1));
            }   
        }
    }
    deleteRow(row) {
        const { id } = row;
        const index = this.findRowIndexById(id); //const index = this.usersData.findIndex(user => user.id === row.id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
    }
    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }
}