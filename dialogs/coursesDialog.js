const { MessageFactory, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, NumberPrompt, TextPrompt, Dialog, ConfirmPrompt } = require('botbuilder-dialogs');

const { Channels } = require('botbuilder-core');
const { coursesForm } = require('./../cards/cards');
const { showCourse } = require('./../cards/cards');
const { rootDialog } = require('./rootDialogue');
let user = require('./../userProfile');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');

const WATERFALL_DIALOG = 'COURSE_DIALOG';


const NAME_PROMPT = 'NAME_PROMPT';
const NUMBER_PROMPT = 'NUMBER_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';




class AddCoursesDialogue extends CancelAndHelpDialog {
    constructor(userState, conversationState) {
        super('AddCoursesDialogue');

        this.conversationState = conversationState;
        this.accessor = this.conversationState.createProperty('DialogAccessor');
        this.userState = userState;
        this.userProfileAccessor = this.userState.createProperty('UserProfileState');







        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new NumberPrompt(NUMBER_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));


        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.preprocessEntities.bind(this),
            this.showForm.bind(this),
            this.displayCourse.bind(this),
            this.applyCourse.bind(this),
            this.continue.bind(this)


        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }


    //----------Entities--LUIS----------------
    async preprocessEntities(stepContext) {
        try {
            if (stepContext.options && stepContext.options.luisResult) {
                console.log(stepContext.options.entities);
                let courseEntitiy = stepContext.options.entities.courseName ? stepContext.options.entities.courseName[0] : null;

                stepContext.values.Entities = {
                    courseEntitiy,
                }

                return stepContext.next();
            }
        } catch (error) {
            console.log(error);
        }
    }


    async showForm(stepContext) {
        try {
            if (!stepContext.values.Entities.courseEntitiy && stepContext.values.Entities.courseEntitiy == null) {

                if (stepContext.context.options && stepContext.options.formReFill) {
                    return stepContext.next();

                } else {
                    await stepContext.context.sendActivity({
                        attachments: [CardFactory.adaptiveCard(coursesForm())]
                    });

                    return Dialog.EndOfTurn;
                }


            } else {
                return stepContext.next();
            }

        } catch (err) {
            console.log(err);
        }

    }
    async displayCourse(stepContext) {
        try {

            let userProfile = await this.userProfileAccessor.get(stepContext.context, user);


            if (stepContext.values.Entities.courseEntitiy && stepContext.values.Entities.courseEntitiy != null) {
                userProfile.courses.push(stepContext.values.Entities.courseEntitiy);
                await stepContext.context.sendActivity({
                    attachments: [CardFactory.adaptiveCard(showCourse(stepContext.values.Entities.courseEntitiy))]
                });
                return Dialog.EndOfTurn;

            } else {
                if (stepContext.context.activity.value) {

                    userProfile.courses.push(stepContext.context.activity.value.courseName);
                    await stepContext.context.sendActivity({
                        attachments: [CardFactory.adaptiveCard(showCourse(stepContext.context.activity.value.courseName))]
                    });
                    return Dialog.EndOfTurn;
                } else {


                    return await next();
                }


            }



        } catch (err) {
            console.log(err);
        }

    }
    async applyCourse(stepContext) {


        // if (!stepContext.context.activity.value && (stepContext.context.activity.text === 'My Portfolio' || stepContext.context.activity.text === 'Add Certificate' || stepContext.context.activity.text === 'Courses' || stepContext.context.activity.text === 'Add skills') || !stepContext.context.activity.value) {

        //     return await stepContext.endDialog();
        // }
        let userProfile = await this.userProfileAccessor.get(stepContext.context)
        let length = userProfile.courses.length - 1;

        if (length != -1) {
            await stepContext.context.sendActivity(`Successfully enrolled in ${userProfile.courses[length]} course.`);
            await stepContext.context.sendActivity('May I help you any further?');
            return await stepContext.prompt(CONFIRM_PROMPT, { prompt: 'You want to continue? ' });

            // await stepContext.context.sendActivity({
            //     attachments: [
            //         CardFactory.heroCard(
            //             'Here are some suggestions: ',
            //             null,
            //             CardFactory.actions([
            //                 {
            //                     type: 'imBack',
            //                     title: 'My Portfolio',
            //                     value: 'My Portfolio'
            //                 },
            //                 {
            //                     type: 'imBack',
            //                     title: 'Add Certificate',
            //                     value: 'Add Certificate'
            //                 },
            //                 {
            //                     type: 'imBack',
            //                     title: 'Courses',
            //                     value: 'Courses'
            //                 },
            //                 {
            //                     type: 'imBack',
            //                     title: 'Add Skills',
            //                     value: 'Add Skills'
            //                 }
            //             ])
            //         )
            //     ]
            // });

        }


    }

    async continue(stepContext) {

        return await stepContext.endDialog();

    }






}


module.exports.AddCoursesDialogue = AddCoursesDialogue;