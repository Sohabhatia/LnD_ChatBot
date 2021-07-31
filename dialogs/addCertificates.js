const { MessageFactory, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, NumberPrompt, TextPrompt, ConfirmPrompt } = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');

let user = require('./../userProfile');
const { showCertificate } = require('./../cards/cards');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');



const WATERFALL_DIALOG = 'CERTIFICATE_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';



class AddCertificateDialogue extends CancelAndHelpDialog {
    constructor(userState, conversationState) {
        super('AddCertificateDialogue');

        this.conversationState = conversationState;
        this.userState = userState;
        this.userProfileAccessor = this.userState.createProperty('UserProfileState');



        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));


        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.preprocessEntities.bind(this),
            this.certificateNo.bind(this),
            this.certificateProvider.bind(this),
            this.requestSent.bind(this),
            this.continue.bind(this)

        ]));
        //this.addDialog(new RootDialog(userState, conversationState));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    //-----------LUIS Entities-----------------------
    async preprocessEntities(stepContext) {
        try {
            if (stepContext.options && stepContext.options.luisResult) {
                console.log(stepContext.options.entities);
                let certNumEntitiy = stepContext.options.entities.number ? stepContext.options.entities.number[0] : null;

                let certNameEntitiy = stepContext.options.entities.certificateName ? stepContext.options.entities.certificateName[0] : null;
                console.log(certNumEntitiy);
                stepContext.values.Entities = {
                    certNumEntitiy,
                    certNameEntitiy
                }

                return stepContext.next();
            }
        } catch (error) {
            console.log(error);
        }
    }









    async certificateNo(stepContext) {
        if (!stepContext.values.Entities.certNumEntitiy && stepContext.values.Entities.certNumEntitiy == null) {
            await stepContext.context.sendActivity('Please enter your details correctly!')
            return await stepContext.prompt(NUMBER_PROMPT, {
                prompt: 'Enter Certificate Number : ',
                retryPrompt: 'Please enter a numeric value!'
            });

        } else {
            return stepContext.next();
        }

    }

    async certificateProvider(stepContext) {
        if (stepContext.values.Entities.certNumEntitiy && stepContext.values.Entities.certNumEntitiy != null) {
            stepContext.values.certificate = stepContext.values.Entities.certNumEntitiy;
        } else {
            stepContext.values.certificate = stepContext.result;
        }

        if (!stepContext.values.Entities.certNameEntitiy && stepContext.values.Entities.certNameEntitiy == null) {
            return await stepContext.prompt(NAME_PROMPT, 'Who is your Certificate Provider ?');
        } else {
            return stepContext.next();
        }

    }

    async requestSent(stepContext) {

        if (stepContext.values.Entities.certNameEntitiy && stepContext.values.Entities.certNameEntitiy != null) {
            stepContext.values.provider = stepContext.values.Entities.certNameEntitiy;
        } else {
            stepContext.values.provider = stepContext.result;
        }

        let userProfile = await this.userProfileAccessor.get(stepContext.context, user);



        //store data in object
        userProfile.certificates.push({
            "CertificateNo": stepContext.values.certificate,
            "Provider": stepContext.values.provider
        });


        await stepContext.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(showCertificate(stepContext.values.certificate))]
        });
        if (stepContext.options.interrupt === true) {
            return await stepContext.prompt(CONFIRM_PROMPT, { prompt: 'You want to continue with previous conversation? ' });
        } else {
            await stepContext.context.sendActivity('May I help you any further?');
            return stepContext.next();
        }

    }

    async continue(stepContext) {
        if (stepContext.result) {
            return await stepContext.endDialog();
        } else {

            return await stepContext.cancelAllDialogs();
        }

    }




}


module.exports.AddCertificateDialogue = AddCertificateDialogue;