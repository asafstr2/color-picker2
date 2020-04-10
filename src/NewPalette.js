import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggebleColorList from "./DraggebleColorList";
// import {arrayMove} from 'react-sortable-hoc';
import arrayMove from "array-move";



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  palette_color: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexBasis: "1",
    alignContent: "flex-start",
  },
  root: {
    display: "flex",
  },
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(0.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPalette(props) {
  const maxColorBox=20;
  const classes = useStyles();
  const [paletteName, setPaletteName] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(
    [
      { name: "red", color: "red" },
      { name: "green", color: "green" },
      { name: "magenta", color: "#800056" },
      { name: "blue", color: "#004080" },
      { name: "purple", color: "#800064" },
      { name: "brown", color: "#803400" },
      { name: "greenish", color: "#008040" },
      { name: "yellow", color: "#dce43a" },
      { name: "pink", color: "#e43a80" },
      { name: "lightgreen", color: "#3ae468" },
    ]
  );
  const [name, setName] = React.useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUniqe", (value) =>
      colors.every(
        ({ name }) => name.toLocaleLowerCase() !== value.toLocaleLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUniqe", (value) =>
      colors.every(({ color }) => color.toLocaleLowerCase() !== currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteNameUniqe", (value) =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [colors, currentColor,props.palettes]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const deleteColorBox = (id) => {
    let newArr = colors.filter((color) => color.name !== id);
    setColors(newArr);
  };


  const handleSubmit = (e) => {
    setColors([...colors, { name: name, color: currentColor }]);
    setName("");
  };
  const savePalette = () => {
    let newName = paletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: "🎨",
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };
const onSortEnd = ({ oldIndex, newIndex }) => {
 setColors (
     arrayMove(colors, oldIndex, newIndex),
  );
};

const randomColor=()=>{
  const allColors=props.palettes.map(p=>p.colors).flat();
  let rand =Math.floor(Math.random()*allColors.length);
  const randomColor=allColors[rand]
  setColors([...colors,randomColor])
}
  return (
    <div className={classes.root}>
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
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={savePalette}>
            <TextValidator
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              validators={["required", "isPaletteNameUniqe"]}
              errorMessages={["this field is required", "name must be uniqe"]}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: currentColor }}
              type="submit"
            >
              save palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      {/* ------------------------------------------Drawer-------------------------------------------------------------------------------------- */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <Typography variant="h4">Design your Palette</Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setColors([])}
          >
            Clear palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={randomColor}
            disabled={colors.length >= maxColorBox}
          >
            Random color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={(newColor) => setCurrentColor(newColor.hex)}
        />
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
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
            style={{ backgroundColor: currentColor }}
            type="submit"
            disabled={colors.length >= maxColorBox}
          >
            {" "}
            Add color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        <div className={classes.palette_color}>
          <DraggebleColorList
            colors={colors}
            deleteColorBox={deleteColorBox}
            axis="xy"
            onSortEnd={onSortEnd}
          />
        </div>
      </main>
    </div>
  );
}
