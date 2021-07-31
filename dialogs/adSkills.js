const { MessageFactory, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, NumberPrompt, ConfirmPrompt, TextPrompt, Dialog } = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');
const { showSkills } = require('./../cards/cards');
const { addSkills } = require('./../cards/cards');
let user = require('./../userProfile');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');



const WATERFALL_DIALOG = 'SKILLS_DIALOG';
const NAME_PROMPT = 'NAME_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';




class AddSkillsDialog extends CancelAndHelpDialog {
    constructor(userState, conversationState) {
        super('AddSkillsDialog');

        this.conversationState = conversationState;
        this.userState = userState;
        this.userProfileAccessor = this.userState.createProperty('UserProfileState');





        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT))



        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.preprocessEntities.bind(this),
            this.provideSkills.bind(this),
            this.skillsAdded.bind(this),
            this.continue.bind(this)

        ]));


        this.initialDialogId = WATERFALL_DIALOG;
    }


    //------LUIS entities------------------------------

    async preprocessEntities(stepContext) {
        try {
            if (stepContext.options && stepContext.options.luisResult) {
                console.log(stepContext.options.entities);
                let skillsEntitiy = stepContext.options.entities.skills ? stepContext.options.entities.skills[0] : null;

                stepContext.values.Entities = {
                    skillsEntitiy,
                }

                return stepContext.next();
            }
        } catch (error) {
            console.log(error);
        }
    }



    async provideSkills(stepContext) {
        if (!stepContext.values.Entities.skillsEntitiy && stepContext.values.Entities.skillsEntitiy == null) {
            await stepContext.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(addSkills())]
            });
            console.log('here2');
            return Dialog.EndOfTurn;

        } else {
            console.log('here1');
            return stepContext.next();

        }


    }



    async skillsAdded(stepContext) {
        let userProfile = await this.userProfileAccessor.get(stepContext.context, user);
        console.log(stepContext.context.activity.value);


        if (stepContext.values.Entities.skillsEntitiy && stepContext.values.Entities.skillsEntitiy != null) {
            stepContext.values.skills = stepContext.values.Entities.skillsEntitiy;
            userProfile.skills.push(stepContext.values.skills);

            await stepContext.context.sendActivity({
                attachments: [CardFactory.adaptiveCard(showSkills(stepContext.values.skills))]
            });


            await stepContext.context.sendActivity('May I help you any further?');
            return await stepContext.context.sendActivity({
                attachments: [
                    CardFactory.heroCard(
                        'Here are some suggestions: ',
                        null,
                        CardFactory.actions([
                            {
                                type: 'imBack',
                                title: 'My Portfolio',
                                value: 'My Portfolio'
                            },
                            {
                                type: 'imBack',
                                title: 'Add Certificate',
                                value: 'Add Certificate'
                            },
                            {
                                type: 'imBack',
                                title: 'Courses',
                                value: 'Courses'
                            },
                            {
                                type: 'imBack',
                                title: 'Add Skills',
                                value: 'Add Skills'
                            }
                        ])
                    )
                ]
            });



        } else {

            //checks if skills are added
            const empty = Object.keys(stepContext.context.activity.value).length === 0;
            if (empty) {

                return await stepContext.prompt(CONFIRM_PROMPT, { prompt: 'You have not added any skill yet! Do you wish to add skills? ' });

            } else {

                stepContext.values.skills = stepContext.context.activity.value.skills;
                userProfile.skills.push(stepContext.values.skills);

                await stepContext.context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(showSkills(stepContext.values.skills))]
                });


                if (stepContext.options.interrupt === true) {
                    let prevDialog;
                    switch (stepContext.options.stack.id) {
                        case 'CERTIFICATE_DIALOG': {
                            prevDialog = 'Add Certificate';
                            break;
                        }
                        case 'RECHARGE_DIALOG': {
                            prevDialog = 'Recharge';
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



            }


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


module.exports.AddSkillsDialog = AddSkillsDialog;