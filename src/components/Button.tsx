import * as MaterialCore from '@material-ui/core';
import theme from '@styles/theme';

interface ButtonProps extends MaterialCore.ButtonProps {
  text?: string;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <MaterialCore.Button 
      {...props}
      style={props.disabled ? { backgroundColor: theme.palette.primary.dark, boxShadow: '-1px 2px 4px 0px rgba(0,0,0,0.45)' } : {}}
    >
      {!!props.loading ? (
        <MaterialCore.CircularProgress
          size={20}
          style={{ color: '#fff' }}
          thickness={5}
          sx={{ mt: 0.3, mb: 0.3 }}
        /> 
      ) : props.text}
    </MaterialCore.Button>
  )
}
