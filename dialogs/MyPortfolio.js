const { MessageFactory, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, NumberPrompt, TextPrompt, Dialog, isComponentPathResolvers } = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');

let user = require('./../userProfile');
const { myPortfolio } = require('./../cards/cards');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');


const WATERFALL_DIALOG = 'PORTFOLIO_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';




class PorfolioDialog extends CancelAndHelpDialog {
    constructor(userState, conversationState) {
        super('portfolioDialog');

        this.conversationState = conversationState;
        this.userState = userState;

        this.userProfileAccessor = this.userState.createProperty('UserProfileState');





        this.addDialog(new TextPrompt(NAME_PROMPT));



        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.showPortfolio.bind(this),
            this.continue.bind(this)


        ]));


        this.initialDialogId = WATERFALL_DIALOG;
    }

    async showPortfolio(stepContext) {

        await stepContext.context.sendActivity('Please wait while I\'m fetching your details.');
        try {
            let userProfile = await this.userProfileAccessor.get(stepContext.context, user);
            let certificateObj = userProfile.certificates.map(el => {
                return {
                    "title": JSON.stringify(el.CertificateNo),
                    "value": el.Provider
                }
            })



            await stepContext.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(myPortfolio(userProfile, certificateObj))]
            });

            if (stepContext.options.interrupt === true) {
                let prevDialog;
                switch (stepContext.options.stack.id) {
                    case 'CERTIFICATE_DIALOG': {
                        prevDialog = 'Add Certificate';
                        break;
                    }
                    case 'RECHARGE_DIALOG': {
                        prevDialog = 'Add Skills';
                        break;
                    }
                    case 'COURSE_DIALOG': {
                        prevDialog = 'Add Courses';
                        break;
                    }
                    case 'SKILLS_DIALOG': {
                        prevDialog = 'Add skills';
                        break;
                    }
                }
                return await stepContext.prompt(CONFIRM_PROMPT, { prompt: `You want to continue with previous conversation of ${prevDialog} ? ` });
            } else {
                await stepContext.context.sendActivity('May I help you any further?');
                return stepContext.next();
            }

        } catch (err) {
            console.log(err);
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


module.exports.PorfolioDialog = PorfolioDialog;