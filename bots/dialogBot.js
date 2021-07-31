// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory } = require('botbuilder');
//const { QnAMaker } = require('botbuilder-ai');


class DialogBot extends ActivityHandler {

    constructor(userState, conversationState, rootDialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');


        // try {
        //     this.qnaMaker = new QnAMaker({
        //         knowledgeBaseId: process.env.QnAKnowledgebaseId,
        //         endpointKey: process.env.QnAEndpointKey,
        //         host: process.env.QnAEndpointHostName
        //     });
        // } catch (err) {
        //     console.warn(`QnAMaker Exception: ${err} Check your QnAMaker configuration in .env`);
        // }


        this.conversationState = conversationState;
        this.userState = userState;
        this.rootDialog = rootDialog;
        this.accessor = this.conversationState.createProperty('DialogAccessor');

        this.onMessage(async (context, next) => {


            // QnA Maker
            //const qnaResults = await this.qnaMaker.getAnswers(context);



            if (context.activity.text === 'L & D') {
                await context.sendActivity({
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
                                    title: 'Add skills',
                                    value: 'Add skills'
                                },
                                {
                                    type: 'imBack',
                                    title: 'Recharge',
                                    value: 'Recharge'
                                }
                            ])
                        )
                    ]
                });

            }
            else if (context.activity.text === 'My Portfolio' || context.activity.text === 'Add Certificate' || context.activity.text === 'Courses' || context.activity.text === 'Add Skills') {
                await this.rootDialog.run(context, this.accessor);
            } //else if (qnaResults[0]) {
            //     await context.sendActivity(qnaResults[0].answer);
            //     // If no answers were returned from QnA Maker, reply with help.
            // }
            else {
                await this.rootDialog.run(context, this.accessor);
            }
            await next();


        })

        this.onMembersAdded(async (context, next) => {

            await context.sendActivity('Hi,I am your Digital Assistant.I can help you with Sales, HR and IT related queries. You can type help any time to get help or cancel to cancel any conversation. For any queries please contact us');
            await context.sendActivity({
                attachments: [
                    CardFactory.heroCard(
                        'Here are some suggestions: ',
                        null,
                        CardFactory.actions([
                            {
                                type: 'imBack',
                                title: 'Leave Management',
                                value: 'Leave Management'
                            },
                            {
                                type: 'imBack',
                                title: 'Payroll',
                                value: 'Payroll'
                            },
                            {
                                type: 'imBack',
                                title: 'Recruitment',
                                value: 'Recruitment'
                            },
                            {
                                type: 'imBack',
                                title: 'L & D',
                                value: 'L & D'
                            }
                        ])
                    )
                ]
            });



            await next();
        });
    }

    async run(context) {
        await super.run(context);

        await this.userState.saveChanges(context, false);
        await this.conversationState.saveChanges(context, false);
    }

}




module.exports.DialogBot = DialogBot;
