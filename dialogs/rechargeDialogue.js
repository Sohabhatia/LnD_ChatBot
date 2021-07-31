const { MessageFactory, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, ChoiceFactory, WaterfallDialog, NumberPrompt, TextPrompt, ConfirmPrompt, ChoicePrompt } = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');




const WATERFALL_DIALOG = 'RECHARGE_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const CHOICE_PROMPT = 'CHOICE_PROMPT';



class RechargeDialogue extends CancelAndHelpDialog {
    constructor(userState, conversationState) {
        super('RechargeDialog');

        this.conversationState = conversationState;
        this.userState = userState;
        this.rechargeStateAccessor = this.conversationState.createProperty('ConversationState');



        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));


        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.addRechargeProvider.bind(this),
            this.amountOfRecharge.bind(this),
            this.getPhoneNumber.bind(this),
            this.paymentOption.bind(this),
            this.sendConfirmation.bind(this),
            this.continue.bind(this)


        ]));


        this.initialDialogId = WATERFALL_DIALOG;
    }


    async addRechargeProvider(stepContext) {
        try {

            return await stepContext.prompt(CHOICE_PROMPT, {
                prompt: 'Please provide name of your service provider?',
                choices: ChoiceFactory.toChoices(['Airtel', 'Vodafone', 'Jio', 'Idea'])
            });

        } catch (error) {
            console.log(error);
        }
    }

    async amountOfRecharge(stepContext) {

        try {
            console.log(stepContext.result);
            let dialogData = await this.rechargeStateAccessor.get(stepContext.context, {});
            stepContext.values.provider = stepContext.result.value;
            dialogData.provider = stepContext.values.provider;
            return await stepContext.prompt(NUMBER_PROMPT, "Enter the recharge amount :");
        } catch {
            console.log(error);
        }
    }

    async getPhoneNumber(stepContext) {

        try {

            let dialogData = await this.rechargeStateAccessor.get(stepContext.context);
            dialogData.amountVal = stepContext.result;
            return await stepContext.prompt(NUMBER_PROMPT, 'Please enter your Phone Number!');
        } catch (error) {

            console.log(error);
        }
    }

    async paymentOption(stepContext) {

        try {
            let dialogData = await this.rechargeStateAccessor.get(stepContext.context);
            dialogData.Phno = stepContext.result;
            return await stepContext.prompt(CHOICE_PROMPT, {
                prompt: 'Select a payment option.',
                choices: ChoiceFactory.toChoices(['Paytm', 'Net Banking', 'Credit Card', 'Google Pay'])
            });

        } catch (error) {

        }
    }

    async sendConfirmation(stepContext) {
        try {
            let dialogData = await this.rechargeStateAccessor.get(
                stepContext.context,
            );
            dialogData.payment = stepContext.result.value;
            await stepContext.context.sendActivity(
                `Your Request of Recharge amount ${dialogData.amountVal} for 
                ${dialogData.Phno} by ${dialogData.provider} is successfull`
            )

            if (stepContext.options.interrupt === true) {
                let prevDialog;
                switch (stepContext.options.stack.id) {
                    case 'CERTIFICATE_DIALOG': {
                        prevDialog = 'Add Certificate';
                        break;
                    }
                    case 'SKILLS_DIALOG': {
                        prevDialog = 'Add Skills';
                        break;
                    }
                    case 'COURSE_DIALOG': {
                        prevDialog = 'Add Courses';
                        break;
                    }
                    case 'PORTFOLIO_DIALOG': {
                        prevDialog = 'My portfolio';
                        break;
                    }
                }
                return await stepContext.prompt(CONFIRM_PROMPT, { prompt: `You want to continue with previous conversation of ${prevDialog} ? ` });
            } else {
                await stepContext.context.sendActivity('May I help you any further?');
                return stepContext.next();
            }


        } catch (error) {
            console.log(error);
        }

    }

    async continue(stepContext) {
        console.log(stepContext.result);
        if (stepContext.result) {
            return await stepContext.endDialog();
        } else {

            return await stepContext.cancelAllDialogs();
        }

    }












}


module.exports.RechargeDialogue = RechargeDialogue;