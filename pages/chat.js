import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_AMON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMTAzNywiZXhwIjoxOTU4ODk3MDM3fQ.Jbu4ZGlJ1FxN2y6Z8fA5qySOwUCG8qa1dCdhkHJc4I0'
const SUPABASE_URL = 'https://agbyhwdldnexskfwldig.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_AMON_KEY)

function messagesRealTime(insertMessage) {
    return supabaseClient
        .from('Mensagens')
        .on('INSERT', (liveResponse) => {
            insertMessage(liveResponse.new)
        })
        .subscribe()
}

export default function ChatPage() {
    const root = useRouter()
    const userLog = root.query.username
    const [message, setMessage] = React.useState('')
    const [messageList, setMessageList] = React.useState([])

    React.useEffect(() => {
        supabaseClient
            .from('Mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //setMessageList(data)
            })

        const subscription = messagesRealTime((newMessage) => {
            setMessageList((currentListValue) => {
                return [
                    newMessage,
                    ...currentListValue,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    function handleNewMessage(newMessage) {
        const message = {
            //id: messageList.length + 1,
            from: userLog,
            text: newMessage,
        }

        supabaseClient
            .from('Mensagens')
            .insert([
                message
            ])
            .then(({ data }) => {
            })
        setMessage('')
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[900],
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'],
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    border: '3px solid #0c3a4d'
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        border: '3px solid #42b0db',
                        padding: '16px',
                    }}
                >

                    <MessageList message={messageList} />
                    {/*{messageList.map(currentMessage => {
                        return (
                            <li key={currentMessage.id}>
                                {currentMessage.from}: {currentMessage.text}
                            </li>
                        )
                    })}*/}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            id="messageField"
                            value={message}
                            onChange={event => {
                                const btnMessage = document.getElementById('btnMessage')
                                const value = event.target.value
                                if (value.length >= 1) {
                                    btnMessage.setAttribute('style', 'display: block')
                                } else {
                                    btnMessage.setAttribute('style', 'display: none')
                                }
                                setMessage(value)
                            }}
                            onKeyPress={event => {
                                const messageField = document.getElementById('messageField')
                                if (event.key === "Enter" && messageField.value !== '') {
                                    event.preventDefault()
                                    handleNewMessage(message)
                                } else {

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                marginRight: '12px',
                                color: '#fff',
                                transition: '.3s',
                                hover: {
                                    color: appConfig.theme.colors.neutrals[999],
                                    backgroundColor: appConfig.theme.colors.neutrals[100]
                                }
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={sticker => {
                                //console.log('Usando o componente Salva o sticker no banco de dados')
                                handleNewMessage(`:sticker: ${sticker}`)
                            }}
                        />
                        <Button
                            style={{ display: 'none' }}
                            id="btnMessage"
                            onClick={event => {
                                const messageField = document.getElementById('messageField')
                                if (messageField.value !== '') {
                                    event.preventDefault()
                                    handleNewMessage(message)
                                }
                            }}
                            type='submit'
                            variant='primary'
                            size='lg'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: '#0c3a4d',
                            }}
                            label='Enviar'
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: '#fff',
                        mainColorLight: '#75ddff',
                        mainColorStrong: '#91e4ff',
                    }}
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.message.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            transition: '.3s',
                            hover: {
                                backgroundColor: '#42b0db',
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: '#fff',
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/*DECLARATIVO */}
                        {/*message.text.startsWith(':sticker').toString()*/}
                        {message.text.startsWith(':sticker:')
                            ? (
                                <Image src={message.text.replace(':sticker:', '')} />
                            )
                            : (
                                message.text
                            )}
                    </Text>
                )
            })}

        </Box>
    )
}