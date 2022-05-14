public with sharing class LigarController {
    
    @AuraEnabled
    public static Account clickToCall(String idRef) {


        try {


            Account cs = new Account( Id = idRef, Span__c = true );

            update cs;


        } catch (Exception e) {
            throw new AuraHandledException('Poxa André não deu paraligar' + e.getMessage());
        }
           

      
        return cs;

    }
    @AuraEnabled
    public static Account desmarcar(String idRef) {
        //throw new AuraHandledException('Poxa André não deu paraligar');
            Account cs = new Account( Id = idRef,
            Span__c = false
        );

        update cs;
        return cs;

    }
}
