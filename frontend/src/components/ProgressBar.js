import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Stepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function ProgressBar() {

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const CustomStepLabel = styled(StepLabel)(({ ownerState }) => ({
    [`& .MuiStepLabel-label`]: {
      color: ownerState.active ? '#784af4' : '#eaeaf0', // Active step color
      ...(ownerState.completed && {
        color: '#784af4', // Completed step color
      }),
    },
  }));

  const steps = ['Select your mood', 'Entertainment', 'Pick Past favorites'];
  const activeStep = 1;

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map((label, index) => (
        <Step key={label}>
          <CustomStepLabel
            StepIconComponent={QontoStepIcon}
            ownerState={{
              active: index === activeStep,
              completed: index < activeStep,
            }}
          >
            {label}
          </CustomStepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
