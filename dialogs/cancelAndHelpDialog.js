// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { InputHints, CardFactory } = require('botbuilder');
const { ComponentDialog, DialogTurnStatus, ConfirmPrompt } = require('botbuilder-dialogs');
const { rootDialog } = require('./rootDialogue');
/**
 * This base class watches for common phrases like "help" and "cancel" and takes action on them
 * BEFORE they reach the normal bot logic.
 */
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';

class CancelAndHelpDialog extends ComponentDialog {
    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }
        return await super.onContinueDialog(innerDc);
    }

    async interrupt(innerDc) {

        if (innerDc.context.activity.text) {
            const text = innerDc.context.activity.text.toLowerCase();
            const button = innerDc.context.activity.text;

            switch (button) {
                case 'help':
                case '?': {
                    const helpMessageText = 'Show help here';
                    await innerDc.context.sendActivity(helpMessageText, helpMessageText, InputHints.ExpectingInput);
                    await innerDc.context.sendActivity('For more L and D related help visit https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/concepts/data-sources-and-content ');
                    return { status: DialogTurnStatus.waiting };
                }
                case 'Courses':
                case 'My Portfolio':
                case 'Add Certificate':
                case 'Add skills':
                case 'Recharge': {
                    console.log('InnerDc =>', innerDc);
                    await innerDc.beginDialog('RootDialog', {
                        interrupt: true,
                        stack: innerDc.stack[0],
                    });

                    return { status: DialogTurnStatus.waiting };
                }

                case 'Yes': {
                    return await innerDc.continueDialog();


                }
                case 'No': {
                    await innerDc.context.sendActivity('May I help you any further?');
                    return await innerDc.cancelAllDialogs();
                }
                case 'cancel':
                case 'quit': {
                    const cancelMessageText = 'Cancelling...';
                    await innerDc.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                    await innerDc.cancelAllDialogs();
                    await innerDc.context.sendActivity('May I help you any further?');
                    return await innerDc.context.sendActivity({
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

                }

            }
        }
    }
}

module.exports.CancelAndHelpDialog = CancelAndHelpDialog;
