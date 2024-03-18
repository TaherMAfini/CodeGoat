import TranslationCell from 'src/components/TranslationCell'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const languages = {
  "cpp": "C++",
  "csharp": "C#",
  "java": "Java",
  "javascript": "JavaScript",
  "python": "Python",
  "typescript": "TypeScript",
}

export const QUERY = gql`
  query TranslationsQuery($uid: String!) {
    translations(uid: $uid) {
      id
      uid
      inputLanguage
      outputLanguage
      createdAt
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translations }) => {
  const theme = useTheme();

  const prettyDate = (translation) => {
    let ampm = "am";
    const translationDate = new Date(translation.createdAt);

    if(translationDate.getHours() >= 12){
      ampm = "pm";
    }

    return (
      <Typography sx={{marginLeft: 'auto', marginRight: '10px', opacity: '0.75'}}>
        {monthNames[translationDate.getMonth()]} {translationDate.getDate()}, {translationDate.getFullYear()}, {translationDate.getHours()%12}:{String(translationDate.getMinutes()).padStart(2, '0')} {ampm}
      </Typography>
    )
  };

  return (
    <>
      {translations.map((translation) => {
        return (
          <Accordion key={translation.id} sx={{ backgroundColor: theme.palette.secondary.main, width: '70%', marginBottom: '5px', marginTop: '5px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={translation.id}
              sx={{ color: theme.palette.text.primary, minHeight: '64px', display: 'flex', margin: '0', alignContent: 'center',
                // '&:not(:last-child)': {
                // },
                // '&::before': {
                // },
                '.css-o4b71y-MuiAccordionSummary-content.Mui-expanded': {
                  my: '12px'
                }
              }}
            >
              <Typography>{languages[translation.inputLanguage]} &#8594; {languages[translation.outputLanguage]}</Typography>
              {prettyDate(translation)}
            </AccordionSummary>

            <AccordionDetails>
              <TranslationCell id={translation.id}/>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </>
  )
}
