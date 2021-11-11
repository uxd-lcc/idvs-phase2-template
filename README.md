This template has been forked & adapted from [Density Design Lab's own version](https://github.com/densitydesign/dd16-phase2-template).

# Hello!

## This is the html template for your IDVS Phase2.

Here is how to work with it.

### Make your copy

Press the green button **code** and select **Download ZIP**.
![How to make local copy](https://media.giphy.com/media/4IJrlAjQ9dd6T9M3zS/source.gif)

### View it locally

Once you downloaded and unzipped the template on your machine, you have 3 options to view it locally:

- Drag the directory into [VS Code](https://code.visualstudio.com/) to open it as a project. Then install and use the [live server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
- Drag the directory into [Atom](https://atom.io/) to open it as a project. Then install and use the [atom-live-server plugin](https://atom.io/packages/atom-live-server).
- Open the project folder in Terminal and run a [Python Simple Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)

### Folder structure and description

#### How to read the icons

:white_check_mark: → Replace it. //
:hammer: → You can edit and customize it. //
:warning: → Edit very carefully. //
:no_entry_sign: → Don't touch it.

:file_folder: dd16-phase2-template

- :file_folder: assets → The folder containing stylesheets, cover image and logos.
  - :file_folder: css
    - :hammer: `custom.css` → Here you can customize colors, fonts and add new CSS styles.
    - :no_entry_sign: `main.css` → This is the main stylesheet that customizes the whole template. Do not touch it.
  - :file_folder: img
    - :white_check_mark: `cover.png` → The cover in your homepage. Replace it.
    - :no_entry_sign: `lcc_logo.png` → Do not touch it.
    - :no_entry_sign: `uxd_logo.png` → Do not touch it.
  - :file_folder: js
    - :no_entry_sign: `utils.js` → Do not touch it.
    - :no_entry_sign: `d3.v4.js` → Do not touch it.
- :file_folder: question-1 → A sample question folder. Duplicate it to create new pages for your research questions. (See [below for more](#question-examples-included))
  - :file_folder: img
    - :white_check_mark: `cover.png`→ The cover of the question page. Replace it.
    - :white_check_mark: `example-finding.png` → An example of a .png image for showing a relevant finding. Replace it.
    - :white_check_mark: `example-mid-viz.svg` → An example of a .svg image for showing a relevant finding. Replace it.
    - :white_check_mark: `example-protocol.png` → An example of a research protocol diagram. Replace it.
    - :white_check_mark: `viz01.png` → An example of the main visualization of the research question. Replace it.
  - :file_folder: js → Content depends on which example question
    - :hammer: `script.js` → You can add your own JavaScript here. Be cautious where you put your own JS. Read the comments in the file.
    - :hammer: `circle.js` → If this exists you can add your own JS here. Refer to [Llewelyn's examples](https://github.com/lewfer/d3si).
    - :no_entry_sign: `d3si.js` → Do not touch
  - :warning: `index.html` → Modify only for updating metadata only.
  - :hammer: `question.html` → Here you can add the html content of the research question. Make sure you leave the `.inner-container` div.
- :no_entry_sign: `gitignore`
- :white_check_mark: `favicon.ico` → You can customise the favicon by replacing it.
- :warning: `index.hthml` → Modify only for updating metadata.
- :hammer: `info.yml` → Here you can add: title, main description, team members. Don't change the file structure.
- :no_entry_sign: `load-templates.js →`Don’t touch it. This .js file generates the template according to .yml files.
- :hammer: `questions.yml` → Here you can add information about each research question (title, description and
  cover for the homepage, the name of the question folder and information about data). !Don't change the file structure!
- :no_entry_sign: `README.md` → The file you are reading right now.

### How to add new research questions

:heavy_exclamation_mark: We suggest you to duplicate research questions step by step.

- ## Duplicate the sample folder and rename it.
  ## ![Duplicate the sample folder and rename it.](https://github.com/bea92/dd16-screen/blob/main/question_1.png)
- ## Update the `questions.yml` by specifying the name and the index of the new research question and adding information
  ![Update the yaml file](https://github.com/bea92/dd16-screen/blob/main/question_2.png)

### How to edit authors’ information

- Add your names in the `ìnfo.yml` file.
  :heavy_exclamation_mark: Do not change the file structure.

--

<!-- ![Add your names.](https://github.com/bea92/dd16-screen/blob/main/info.png) -->

### Question examples included

Each of the 3 included questions is a different usage example.

#### Question 1

- `question-1/question.html`
  This contains an SVG within the file itself, opposed to be loaded from a seperate `.svg` file.
  It also contains other HTML that creates the rest of the page (images, text, etc).

- `assets/custom.css`
  You can add custom CSS to this file which will affect the SVG. This file is shared across all questions. We need to be careful that CSS from one question doesn't conflict with other questions or what is inside `main.css`.

- `question-1/js/script.js`
  Here you can include plain/vanilla JS (i.e. no library used) here to modify the SVG and make it interactive.

#### Question 2

This loads an _SVG file_ (`visualisation.svg`) into the page. It also includes the D3.js library so you can control and manipulate it.

- `question-2/question.html`
  This file contains the HTML that creates the main content of the page (images, text, etc). You can draw your visualisations into this using D3. You can add HTML elements above the `#visualisation` div. The included D3.js code is from Llewelyn's example: [5a. Circles with Transitions](https://github.com/lewfer/d3si/tree/master/05a.%20Circles%20with%20Transition).

  ```
  <div>
    <button>Click me</button>
    <div id="visualisation">
      <!-- leave me empty -->
    </div>
  </div>
  ```

- `question-1/js/script.js`
  In this files you can include your D3.js code to modify the SVG and make it interactive.

- `question-1/js/circles.js`
  This file is also loaded in. It replicates the way Llewelyn's examples work.

#### Question 3

This example includes a YouTube embed. Showing that you can do more than just use Data Visualisations and SVGs within this report.

- `question-3/question.html`
  Contains the HTML embed (usually an iframe) that you can get from YouTube, Vimeo, etc.
