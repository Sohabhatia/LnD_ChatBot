module.exports = {
    coursesForm: () => {
        let course = {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**Recommended Courses** ",
                            "size": "Medium",
                            "weight": "Bolder",
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "ImageSet",
                    "images": [
                        {
                            "type": "Image",
                            "size": "Large",
                            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduDdUGBhfEEmYZxbpMsxzZlmmElmeOR_5og&usqp=CAU",
                            "id": "BigData"
                        },
                        {
                            "type": "Image",
                            "size": "Large",
                            "url": "https://www.freecodecamp.org/news/content/images/2020/05/Python-language.png",
                            "id": "Python"
                        },
                        {
                            "type": "Image",
                            "size": "Large",
                            "horizontalAlignment": "Center",
                            "url": "data:image/png;base64,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",
                            "id": "Node"
                        },
                        {
                            "type": "Image",
                            "size": "Large",
                            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3EY_Jq9JjoyhbRI6scfuI0Isq9NHciAfrOA&usqp=CAU",
                            "id": "CCNA"
                        }
                    ],
                    "horizontalAlignment": "Center",
                    "imageSize": "Large",
                    "separator": true
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**Other Training Courses**",
                            "fontType": "Default",
                            "size": "Medium",
                            "weight": "Bolder",
                            "color": "Accent",
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "If you wish to apply for  courses, please let me know :\n",
                    "wrap": true,
                    "separator": true
                },
                {
                    "type": "Input.ChoiceSet",
                    "choices": [
                        {
                            "title": "Big Data",
                            "value": "Big Data"
                        },
                        {
                            "title": "Python",
                            "value": "Python"
                        },
                        {
                            "title": "Node",
                            "value": "Node"
                        },
                        {
                            "title": "Cisco CCNA",
                            "value": "Cisco CCNA"
                        }
                    ],
                    "id": "courseName",
                    "placeholder": "---Select the course---"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Proceed",
                            "id": "proceedCourse",
                            "style": "positive",
                            "data": {
                                "actiontype": "proceed"
                            }
                        }
                    ]
                }
            ]
        }

        return course;
    },
    showCourse: (courseName) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**You have requested for the following course :** ",
                            "color": "Accent",
                            "weight": "Bolder"
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": `${courseName}`
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ActionSet",
                            "actions": [
                                {
                                    "type": "Action.OpenUrl",
                                    "id": "ExploreCourse",
                                    "title": "Explore Course",
                                    "style": "positive",
                                    "url": "https://www.udemy.com/",
                                    "iconUrl": "https://www.udemy.com/"
                                },
                                {
                                    "type": "Action.Submit",
                                    "id": "ApplyCourse",
                                    "title": "Apply",
                                    "style": "positive"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    myPortfolio: (user, certificateObj) => {

        return {
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "items": [
                                        {
                                            "type": "Container",
                                            "style": "emphasis",
                                            "items": [
                                                {
                                                    "type": "ColumnSet",
                                                    "columns": [
                                                        {
                                                            "type": "Column",
                                                            "width": "stretch",
                                                            "height": "stretch",
                                                            "items": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "wrap": true,
                                                                    "text": "**MY PORTFOLIO**",
                                                                    "horizontalAlignment": "Center",
                                                                    "size": "Large",
                                                                    "color": "Accent",
                                                                    "weight": "Bolder"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "bleed": true,
                                            "height": "stretch",
                                            "minHeight": "40px",
                                            "backgroundImage": {
                                                "url": "https://media.istockphoto.com/photos/abstract-blue-backgrounds-picture-id1225495890?b=1&k=6&m=1225495890&s=170667a&w=0&h=dI4lmuVIgDxdJbF4vRDRqTcf6_MPeERyi4mZiW6hm24="
                                            }

                                        },
                                        {
                                            "type": "Image",
                                            "url": "data:image/png;base64,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",
                                            "width": "90px",
                                            "height": "70px",
                                            "horizontalAlignment": "Center"
                                        },
                                        {
                                            "type": "Container",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "size": "Medium",
                                                    "wrap": true,
                                                    "text": "**CERTIFICATES** :\n",
                                                    "weight": "Bolder",
                                                    "color": "Accent"
                                                }
                                            ],
                                            "style": "default"
                                        }
                                    ],
                                    "width": "stretch"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "FactSet",
                            "facts": certificateObj,
                            "spacing": "None",
                            "height": "stretch",
                            "separator": true
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "Container",
                    "spacing": "Medium",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**SKILLS** :",
                            "weight": "Bolder",
                            "color": "Accent",
                            "size": "Medium"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": `${user.skills}`,
                            "separator": true
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "Container",
                    "spacing": "Medium",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**TRAINING COURSES** :",
                            "color": "Accent",
                            "size": "Medium",
                            "weight": "Bolder"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": `${user.courses}`
                        }
                    ],
                    "separator": true
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.1",
            "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly.",

        }




        //{
        //     "type": "AdaptiveCard",
        //     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        //     "version": "1.3",
        //     "body": [
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": "My Portfolio",
        //                     "horizontalAlignment": "Center",
        //                     "size": "Medium",
        //                     "color": "Accent",
        //                     "weight": "Bolder"
        //                 }
        //             ],
        //             "separator": true
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": "Skills",
        //                     "horizontalAlignment": "Center",
        //                     "weight": "Bolder"
        //                 }
        //             ],
        //             "separator": true
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": `${user.skills}`
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": "Courses",
        //                     "horizontalAlignment": "Center",
        //                     "weight": "Bolder"
        //                 }
        //             ],
        //             "separator": true
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": `${user.courses}`
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "Container",
        //             "separator": true,
        //             "items": [
        //                 {
        //                     "type": "TextBlock",
        //                     "wrap": true,
        //                     "text": "Certificate",
        //                     "horizontalAlignment": "Center",
        //                     "weight": "Bolder"
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "Container",
        //             "items": [
        //                 {
        //                     "type": "FactSet",
        //                     "facts": certificateObj

        //                 }
        //             ]
        //         }
        //     ]
        // }
    },
    showCertificate: (Certnumber) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "text": "Your Request for adding the certificate with certificate number :-\n",
                    "fontType": "Default",
                    "size": "Medium",
                    "color": "Good"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": `${Certnumber}`,
                            "size": "Large"
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": 50,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "text": "has been successfully added.",
                                    "size": "Medium",
                                    "color": "Good"
                                }
                            ]
                        }
                    ],
                    "separator": true
                }
            ]
        }
    },
    showSkills: (skills) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "fontType": "Default",
                    "size": "Medium",
                    "color": "Good",
                    "text": "Your Skills : - "
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "size": "Large",
                            "text": `${skills}`
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": 50,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "wrap": true,
                                    "size": "Medium",
                                    "color": "Good",
                                    "text": "has been successfully added to your portfolio. You can view you skills in ‘My Portfolio’ section anytime."
                                }
                            ]
                        }
                    ],
                    "separator": true
                }
            ]
        }
    },
    addSkills: () => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**Add your skills**",
                            "size": "Medium",
                            "color": "Accent",
                            "weight": "Bolder"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "wrap": true,
                            "text": "**Please enter you skills below seperated by a ',' -**",
                            "separator": true,
                            "weight": "Bolder",
                            "id": "add"
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "Input.Text",
                            "placeholder": "---Enter skills----",
                            "id": "skills"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ActionSet",
                            "actions": [
                                {
                                    "type": "Action.Submit",
                                    "style": "positive",
                                    "id": "submitSkill",
                                    "title": "Add"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
}