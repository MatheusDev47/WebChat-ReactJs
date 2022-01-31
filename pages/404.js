import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'

function ErrorMessage (props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 70px;
                    text-align: center;
                }
            `}
            </style>
            <Tag>{props.children}</Tag>
        </>
    )
}

export default function NotFoundPage () {
    return (
    <>
        <Box 
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[900],
            }}
        >
            <Box
                styleSheet={{
                    width: '100%', maxWidth: '900px',
                    border: '3px solid #5cc3e6',
                    borderRadius: '20px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[700]
                }}
            >
                <ErrorMessage>Nada para reagir aqui. Página não encontrada ;-;</ErrorMessage>
            </Box>

        </Box>
    </>
    )

}