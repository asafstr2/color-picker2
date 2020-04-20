import React from "react";
import clsx from "clsx";
// eslint-disable-next-line
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import SaveIcon from "@material-ui/icons/Save";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import sizes from "./styles/sizes";

export default function PaletteFormNav(props) {
  const {
    open,
    savePalette,
    handleDrawerOpen,
    paletteName,
    setPaletteName,
    drawerWidth,
  } = props;
  const [paletteSaved, setPaletteSaved] = React.useState(false);
  const [PaletteEmojiSaved, setPaletteEmojiSaved] = React.useState(false);

  const Cancelmerge = () => {
    const paletteToMerge = JSON.parse(
      window.sessionStorage.getItem("paletteBackup")
    );
    const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
    savePalettes.push(paletteToMerge);
    props.setPalette(paletteToMerge);
  };

  const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    inner: {
      width: "100%",
    },
    outer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    typography: {
      width: "100%",
      fontWeight: "600",
      paddingLeft: "15%",
    },
    typographyNav: {
      width: "100%",
      fontWeight: "600",
    },
    popup: {
      borderRadius: "5px",
      position: "fixed",
      bottom: "40%",
      right: "40%",
      border: "3px solid #f1f1f1",
      zIndex: "9",
      width: "20%",
      height: "32%",
      [sizes.down("lg")]: {
        width: "20%",
        height: "40%",
      },
      [sizes.down("md")]: {
        width: "40%",
        height: "40%",
      },
      [sizes.down("sm")]: {
        minWidth: "200px",
        width: "50%",
        height: "40%",
        right: "25%",
      },
      [sizes.down("xs")]: {
        minWidth: "200px",
        width: "50%",
        minHeight: "400px",
        height: "40%",
        top:"20%",
        right: "25%",
      },
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      padding: "2px",
      backgroundColor: "rgba(248,249,252,0.85)",

      "& div": {
        width: "100%",
        marginBottom: "15px",
        alignSelf: "center",
        "& label": {
          // paddingLeft: "30%",
        },
      },
    },

    emojipopup: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      bottom: "20%",
      right: "40%",
      zIndex: "9",

      [sizes.down("sm")]: {
        minWidth: "200px",
        right: "20%",
        bottom: "10%",
      },
    },

    backdrop: {
      zIndex: "8",
      color: "#fff",
    },
  }));

  const classes = useStyles();

  let xs = window.innerWidth > 575.98 ? false : true;
  const emoji = (
    <div className={classes.emojipopup}>
      <Picker
        set="apple"
        onSelect={(addEmoji) => savePalette(addEmoji)}
        emojiSize={xs ? 15 : 25}
        title={"pick an Emoji"}
      />
    </div>
  );
  const textVal = (
    <div className={classes.popup}>
      <ValidatorForm
        onSubmit={() => {
          setPaletteSaved(false);
          setPaletteEmojiSaved(true);
        }}
        className={classes.formContainer}
      >
        <Typography variant="h4" className={classes.typography}>
          Save Palette
        </Typography>
        <TextValidator
          variant="outlined"
          label="Palette Name"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          validators={["required", "isPaletteNameUniqe"]}
          errorMessages={["this field is required", "name must be uniqe"]}
        />
        <Button variant="contained" color="primary" type="submit">
          save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setPaletteSaved(false);
            setPaletteName("");
          }}
        >
          Cancel
        </Button>
      </ValidatorForm>
    </div>
  );

  return (
    <div>
      {paletteSaved && textVal}
      {PaletteEmojiSaved && emoji}

      <Backdrop
        className={classes.backdrop}
        open={paletteSaved || PaletteEmojiSaved}
        onClick={() => {
          setPaletteSaved(false);
          setPaletteEmojiSaved(false);
        }}
      />
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.outer}>
            <Typography variant="h5" className={classes.typographyNav}>
              Create a Palette
            </Typography>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setPaletteSaved(true)}
              startIcon={<SaveIcon />}
            >
              save
            </Button>
            <Link
              to="/"
              style={{ textDecoration: "none", marginLeft: "5px" }}
              onClick={() => Cancelmerge()}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                fontSize="small"
              >
                back
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
