import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { truncateText } from "../Util.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaperPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      paper: props.paper,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ expanded: nextProps.expanded, paper: nextProps.paper });
  }
  classes = (theme) => ({
    root: {
      width: "345px",
      height: "500px",
      margin: "5px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  });

  handleExpandClick = () => {
    this.setState({ expanded: true });
  };

  handleClose = () => {
    this.setState({ expanded: false });
  };

  dialog() {
    console.log("HERE");
    return (
      <Dialog
        open={this.state.expanded}
        onClose={this.handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {this.state.paper.title}
        </DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            className={this.classes.media}
            image={this.state.paper.img}
            title={truncateText(this.state.paper.title, 96)}
          />
          <DialogContentText>
            <Typography variant="caption" paragraph>
              {this.state.paper.published_time}
            </Typography>
            <Typography variant="caption" paragraph>
              {this.state.paper.category}
            </Typography>
            <Typography variant="subtitle2" paragraph>
              {this.state.paper.authors}
            </Typography>
            <Typography variant="body2" paragraph>
              {this.state.paper.abstract}
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

  render() {
    return (
      <Container className={this.classes.root}>
        <Card style={{ height: "280px", maxHeight: "350px" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={this.classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={truncateText(this.state.paper.title, 48)}
            subtitle={truncateText(
              JSON.stringify(this.state.paper.authors),
              96
            )}
            subheader={this.state.paper.published_time}
          />
          <CardMedia
            component="img"
            className={this.classes.media}
            image={this.state.paper.img}
            title={truncateText(this.state.paper.title, 96)}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {truncateText(JSON.stringify(this.state.paper.authors), 96)}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              className={clsx(this.classes.expand, {
                [this.classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-label="show more"
            >
              Read Abstract
            </Button>
          </CardActions>
          {this.dialog()}
        </Card>
        <div style={{ height: "10px" }}></div>
      </Container>
    );
  }
}
export default PaperPreview;
