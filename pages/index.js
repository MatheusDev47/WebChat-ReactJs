import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'

function GlobalStyle () {
    return (
        <style global="true" sjx>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
                margin-bottom: 5px;
        }

        body {
            font-family: 'Open Sans', sans-serif;
        }

        /* App fit Height */ 
            html, body, #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
        }

        #__next {
            flex: 1;
        }

        #__next > * {
            flex: 1;
        }
        `}</style>
    )
}

function TitleReact (props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <style jsx>{`
            ${Tag} {
                color: #5cc3e6;
                font-size: 30px;
                font-weight: 700;
                margin-top: 30px;
                margin-bottom: 10px;
            }   
            `}
            </style>
            <Tag>{props.children}</Tag>
        </>     
    )
}

function TitleChat (props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 30px;
                font-weight: 700;
                margin-top: 30px;
                margin-bottom: 10px;
            }   
            `}
            </style>
            <Tag>{props.children}</Tag>
        </>     
    )
}

function DescriptionTxt (props) {
    const Tag = props.tag || '<p>'
    return (
        <>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 17px;
                font-weight: 700;
                color: #5cc3e6;
                margin-bottom: 5px;
            }   
            `}
            </style>
            <Tag>{props.children}</Tag>
        </>     
    )
}

export default function HomePage () {
    const username = 'MatheusDev47'
    return (
        <>
            <GlobalStyle />
            <Box 
                styleSheet={{
                     display: 'flex', alignItems: 'center', justifyContent: {md: 'center'},
                     backgroundColor: appConfig.theme.colors.neutrals[900],
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        order: '2',
                        width: '100%', maxWidth: '700px',
                        border: '5px solid #5cc3e6',
                        borderRadius: '20px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >  
                    {/*Formulário*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', order: '2',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Box styleSheet={{display: 'flex'}}>
                            <TitleReact>React</TitleReact>
                            <TitleChat>Chat</TitleChat>
                        </Box>
                        
                        <DescriptionTxt tag="p">Toda mensagem tem uma reação</DescriptionTxt>

                        <TextField
                        fullWidth
                        textFieldColors={{
                            neutral: {
                            textColor: appConfig.theme.colors.neutrals[200],
                            mainColor: appConfig.theme.colors.neutrals[900],
                            mainColorHighlight: '#5a9fed',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            },
                        }}
                        />
                        <Button
                        styleSheet={{
                            marginTop: '5px'
                        }}
                        type='submit'
                        label='Entrar'
                        fullWidth
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: '#5cc3e6',
                            mainColorLight: '#75ddff',
                            mainColorStrong: '#91e4ff',
                        }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: '#5cc3e6',
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                    <Image
                        styleSheet={{
                            borderRadius: '50%',
                            marginBottom: '16px',
                        }}
                        src={`https://github.com/${username}.png`}
                        />
                        <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px'
                        }}
                        >
                        {username}
                        </Text>
                    </Box> 
                    {/* Photo Area */}
                </Box>

                <Image styleSheet={{width: {lg: '50%'}, display: {xl: 'block', xs: 'none'}}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />

            </Box>
        </>
    )
}
