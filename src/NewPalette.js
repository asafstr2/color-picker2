import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import DraggebleColorList from "./DraggebleColorList";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPicker from "./ColorPicker";
import sizes from "./styles/sizes";






const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  mainDrawer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "2% 0",
  },
  Buttons: {
    marginTop:"5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",

    "& button": {
      margin: "1%",
      fontSize: "0.6rem",
    },
  },
  palette_color: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexBasis: "1",
    alignContent: "flex-start",
    [sizes.down("xs")]:{
      height: "90%",
    },
  },
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f2f5f6",
    [sizes.down("xs")]:{
      width: "100vw",

    },
  },
  drawerHeader: {
    backgroundColor: "#e4e8e9",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    cursor: "pointer",
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
  const paletteid = JSON.parse(window.sessionStorage.getItem("paletteid"));


  const maxColorBox = 20;
  const classes = useStyles();
  const [paletteName, setPaletteName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(paletteid||[
    { name: "Beekeeper", color: "#f6e58d" },
    { name: "DeepKoamaru", color: "#30336b" },
    { name: "TomatoRed", color: "#eb2f06" },
    { name: "LuckyPoint", color: "#2c2c54" },
    { name: "SyntheticPumpkin", color: "#ff793f" },
    { name: "NasturcianFlower", color: "#e84118" },
    { name: "DownloadProgress", color: "#4cd137" },
    { name: "BaraRose", color: "#ED4C67" },
    { name: "purple", color: "#9C27B0" }
  ]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUniqe", (value) =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [props.palettes]);

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

  const handleSubmit = (name, currentColor) => {
    setColors([...colors, { name: name, color: currentColor }]);
  };
  const savePalette = (emoji) => {
    let newName = paletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: emoji.native,
      colors: colors,
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const randomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];

let check=true
    while (check) {
                    // eslint-disable-next-line
                    if (colors.some((color) => color.name === randomColor.name)) {
                      console.log(colors,randomColor)
                      rand = Math.floor(Math.random() * allColors.length);
                      randomColor = allColors[rand];
                    } else check = false;
                  }
    setColors([...colors, randomColor]);
   

  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        savePalette={savePalette}
        handleDrawerOpen={handleDrawerOpen}
        paletteName={paletteName}
        setPaletteName={setPaletteName}
        drawerWidth={drawerWidth}
      
        setPalette={ props.savePalette}
      />
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
        {/* ------------------------------------------Drawer header------------------------------------------------------------------------------------- */}

        <div className={classes.drawerHeader} onClick={handleDrawerClose}>
          <Typography variant="h6">Design your Palette</Typography>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        {/* ------------------------------------------Drawer body-------------------------------------------------------------------------------------- */}

        <div className={classes.mainDrawer}>
          <div className={classes.Buttons}>
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
        </div>
        <ColorPicker
          handleSubmit={handleSubmit}
          colors={colors}
          maxColorBox={maxColorBox}
        />
      </Drawer>

      {/* ------------------------------------------main-------------------------------------------------------------------------------------- */}

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




 