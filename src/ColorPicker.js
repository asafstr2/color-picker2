import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import chroma from "chroma-js";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


export default function ColorPicker(props) {

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "2%",
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "cener",
  },
  form: {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "5%",
    "& div": {
      height: "60px",
      width: "100%",
      "& label": {
      },
    },
    "& button": {
      marginTop: "6%",
      width: "100%",
      backgroundColor: (props) => props.maxColorBox >=20? "grey":currentColor,
    },
  },
}));

  const [name, setName] = React.useState("");
  const [currentColor, setCurrentColor] = React.useState("teal");
  const { handleSubmit, colors, maxColorBox } = props;
  const classes = useStyles();

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUniqe", (value) =>
      colors.every(
        ({ name }) => name.toLocaleLowerCase() !== value.toLocaleLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUniqe", (value) =>
      colors.every(({ color }) => color.toLocaleLowerCase() !== currentColor)
    );
  }, [colors, currentColor, props.palettes]);

  const localSubmithandle = () => {
    handleSubmit(name, currentColor);
    setName("");
    setCurrentColor(chroma.random().hex())
  };

  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
      />
      <ValidatorForm onSubmit={localSubmithandle} className={classes.form}>
        <TextValidator
          variant="outlined"
          help="must fill and and must be uniqe"
          label="color Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          validators={["required", "isColorNameUniqe", "isColorUniqe"]}
          errorMessages={[
            "this field is required",
            "name must be uniqe",
            "color is alredy taken",
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={colors.length >= maxColorBox }
        >
          Add color
        </Button>
      </ValidatorForm>
    </div>
  );
}
