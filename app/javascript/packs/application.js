import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import "../application.css";
// import "stylesheet";

// import "stylesheet";

// import "stylesheets";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

import "controllers";
