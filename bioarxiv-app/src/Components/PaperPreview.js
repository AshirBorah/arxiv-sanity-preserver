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
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import { truncateText } from "../Util.js";

class PaperPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      paper: props.paper,
    };
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
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <Container className={this.classes.root}>
        <Card style={{ height: "280px", maxHeight: "350px", overflow: scroll }}>
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
            title={truncateText(this.props.paper.title, 48)}
            subheader={this.props.paper.published_time}
          />
          <CardMedia
            component="img"
            className={this.classes.media}
            image={this.props.paper.img}
            title={truncateText(this.props.paper.title, 96)}
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
            <IconButton
              className={clsx(this.classes.expand, {
                [this.classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" paragraph>
                {this.state.paper.title}
              </Typography>
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
            </CardContent>
          </Collapse>
        </Card>
        <div style={{ height: "10px" }}></div>
      </Container>
    );
  }
}
export default PaperPreview;
