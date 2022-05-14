public with sharing class AccountController {
  
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Name, Fax, Website
            FROM Account
            WHERE Name = '001244_PF_THALITA_REBOUCAS'
        ];
    }
}
