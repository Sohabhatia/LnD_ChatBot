
const { ComponentDialog, DialogSet, DialogTurnStatus, WaterfallDialog, ChoiceFactory, ChoicePrompt } = require('botbuilder-dialogs');
const { MessageFactory } = require('botbuilder');

const { ActionTypes } = require('botframework-schema');
const { LuisRecognizer } = require('botbuilder-ai');
const { Channels } = require('botbuilder-core');
const { AddCertificateDialogue } = require('./addCertificates');
const { AddSkillsDialog } = require('./adSkills');
const { AddCoursesDialogue } = require('./coursesDialog');
const { PorfolioDialog } = require('./MyPortfolio');
const { RechargeDialogue } = require('./rechargeDialogue');
const { QnAMaker } = require('botbuilder-ai');
const { OrchestratorRecognizer } = require('botbuilder-ai-orchestrator');

const WATERFALL_DIALOG = 'WATERFALL_DIALOG';
const CHOICE_PROMPT = 'CHOICE_PROMPT';

// const luisConfig = {
//     applicationId: '1d1b5ce0-6e73-4f65-a3c5-237d3715a8d6',
//     endpointKey: '7dba0b10cb3440b88cfead2f7b1c15e0',
//     endpoint: 'https://manipal-interns-luis.cognitiveservices.azure.com/',
// }
const luisConfig = {
    applicationId: '6ff1ff5b-f783-4587-a2fc-bdbe5339f378',
    endpointKey: '317ef520ad4b42149b2bf25394829cb2',
    endpoint: 'https://manipal-interns-luis-authoring.cognitiveservices.azure.com/',
}

class RootDialog extends ComponentDialog {
    constructor(userState, conversationState) {
        super('RootDialog');

        this.conversationState = conversationState;
        this.userState = userState;




        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.selectMessage.bind(this),
            //this.routeMessage.bind(this)

        ]));

        //LUIS
        this.recognizer = new LuisRecognizer(luisConfig, {
            apiVersion: 'v3'
        });

        this.LnDLuisRecognizer = new LuisRecognizer({
            applicationId: "1d1b5ce0-6e73-4f65-a3c5-237d3715a8d6",
            endpointKey: "317ef520ad4b42149b2bf25394829cb2",
            endpoint: "https://manipal-interns-luis-authoring.cognitiveservices.azure.com/"
        }, {
            apiVersion: 'v3'
        });

        //Dispatcher
        // this.dispatchRecognizer = new OrchestratorRecognizer().configure({
        //     modelFolder: process.env.ModelFolder,
        //     snapshotFile: process.env.SnapshotFile
        // });

        // //QnA maker
        this.qnaMaker = new QnAMaker({
            knowledgeBaseId: process.env.QnAKnowledgebaseId,
            endpointKey: process.env.QnAEndpointKey,
            host: process.env.QnAEndpointHostName
        });




        this.addDialog(new AddCertificateDialogue(userState, conversationState));
        this.addDialog(new AddSkillsDialog(userState, conversationState));
        this.addDialog(new AddCoursesDialogue(userState, conversationState));
        this.addDialog(new PorfolioDialog(userState, conversationState));
        this.addDialog(new RechargeDialogue(userState, conversationState));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();

        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }



    async selectMessage(stepContext) {

        // Recognise which type of service to use
        let luisresponse = await this.recognizer.recognize(stepContext.context);
        let luisintent = luisresponse.luisResult.prediction.topIntent;
        console.log(luisintent);


        switch (luisintent) {
            case 'l_Soha_LnD': {

                console.log('processSohaLnD');


                const luisresponse1 = await this.LnDLuisRecognizer.recognize(stepContext.context);
                console.log(luisresponse1);
                let luisintent1 = luisresponse1.luisResult.prediction.topIntent;
                console.log(luisintent1);

                if (stepContext.options && stepContext.options.interrupt) {

                    const stack = stepContext.options.stack;

                    switch (luisintent1) {
                        case 'Add Certificate':
                            return await stepContext.beginDialog('AddCertificateDialogue', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                                interrupt: true,
                                stack
                            });

                        case 'Add skills':
                            return await stepContext.beginDialog('AddSkillsDialog', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                                interrupt: true,
                                stack
                            });

                        case 'Courses':
                            return await stepContext.beginDialog('AddCoursesDialogue', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                                interrupt: true,
                                stack
                            });

                        case 'My Portfolio':
                            if (luisresponse.intents.My_Portfolio.score > 0.8) {
                                return await stepContext.beginDialog('portfolioDialog', {
                                    luisResult: true,
                                    entities: luisresponse1.luisResult.prediction.entities,
                                    interrupt: true,
                                    stack
                                });
                            } else {
                                return await stepContext.context.sendActivity('Sorry could not process that! Can you please try it in a different way.');
                            }

                        case 'Recharge':
                            return await stepContext.beginDialog('RechargeDialog', {
                                interrupt: true,
                                stack
                            });


                    }
                }

                else {

                    switch (luisintent1) {
                        case 'Add Certificate':
                            return await stepContext.beginDialog('AddCertificateDialogue', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                            });

                        case 'Add skills':
                            return await stepContext.beginDialog('AddSkillsDialog', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                            });

                        case 'Courses':
                            return await stepContext.beginDialog('AddCoursesDialogue', {
                                luisResult: true,
                                entities: luisresponse1.luisResult.prediction.entities,
                            });

                        case 'My Portfolio':
                            if (luisresponse.intents.My_Portfolio.score > 0.8) {
                                return await stepContext.beginDialog('portfolioDialog', {
                                    luisResult: true,
                                    entities: luisresponse1.luisResult.prediction.entities
                                });
                            } else {
                                return await stepContext.context.sendActivity('Sorry could not process that! Can you please try it in a different way.');
                            }
                        case 'Recharge':
                            return await stepContext.beginDialog('RechargeDialog');



                    }

                }
            }
                break;
            case 'q_Yukti_Bot': {

                console.log('processQnA');

                const results = await this.qnaMaker.getAnswers(stepContext.context);

                if (results.length > 0) {
                    return await stepContext.context.sendActivity(`${results[0].answer}`);
                } else {
                    return await stepContext.context.sendActivity('Sorry, could not find an answer in the Q and A system.');
                }
            }

                break;
            default:
                console.log(`Dispatch unrecognized intent: ${intent}.`);
                await context.sendActivity(`Dispatch unrecognized intent: ${intent}.`);
                break;
        }

    }



}





module.exports.RootDialog = RootDialog;