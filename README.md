# LivingStyleGuide for Broccoli

Easily create living style guides/front-end style guides/pattern libraries by adding Markdown documentation to your Sass project. [Follow @LSGorg](https://twitter.com/LSGorg) for updates.

![preview](https://cloud.githubusercontent.com/assets/103399/3854622/2fb68574-1eda-11e4-862c-33e7d7943c56.jpg)

* On the left: http://www.homify.de/assets/styleguide.html
* On the right: http://livingstyleguide.com/eurucamp/

----

_**Warning:** this is in early alpha. I’m neither a NPM nor a [Broccoli](https://github.com/broccolijs/broccoli) expert. Let me know if you have suggestions to improve via [Twitter](https://twitter.com/LSGorg) or [open an issue](http://github.com/hagenburger/broccoli-livingstyleguide/issues/new)._


## Usage

1.  Setup:

    Make sure [Ruby is installed](https://www.ruby-lang.org/en/downloads/) (on Mac OS Ruby is installed by default) and create a file named _[Gemfile](http://bundler.io/#getting-started)_ in your project’s path:

    ``` ruby
    source 'https://rubygems.org'
    gem 'livingstyleguide'
    ```

    Add to the plugin to your `dependencies` in your _package.json_:

    ``` json
    {
      "dependencies": {
        "broccoli-livingstyleguide": "^0.1.0"
      }
    }
    ```

    Install dependencies via command line:

    ```
    bundle
    npm install
    ```

    Assuming you have a stylesheet called _app/styles/app.scss_ (as Ember CLI does) add this your _Brocfile.js_:

    ``` javascript
    var LivingStyleGuide = require('broccoli-livingstyleguide');
    var lsg = LivingStyleGuide(['app'], 'styles/styleguide.lsg', 'assets/styleguide.html');
    module.exports = lsg;
    // For Ember CLI use this instead:
    // module.exports = mergeTrees([app.toTree(), lsg]);
    ```


2.  Create a file _app/styles/styleguide.lsg_ containing:
    ``` yaml
    source: 'app.scss'
    title: 'My Living Style Guide'
    ```

3.  Write documentation for each module *app/styles/partials/_buttons.md* (to describe *_buttons.scss* in the same folder):

        Buttons
        =======

        ```
        <button class="button">Example button</button>
        ```

        ```
        <button class="button -primary">Example button</button>
        ```

4.  Open the generated _dist/assets/styleguide.html_.


Make sure to check out the [documentation for writing examples](https://github.com/hagenburger/livingstyleguide#writing-examples) and learn how to display colors from variables, use template languages, and helper functions.


----


## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


----


## Copyright

Copyright 2014 [Nico Hagenburger](http://www.hagenburger.net).
See [MIT-LICENSE.md](MIT-LICENSE.md) for details.
Get in touch with [@hagenburger](http://twitter.com/hagenburger) on Twitter or [open an issue](https://github.com/hagenburger/livingstyleguide/issues/new).

