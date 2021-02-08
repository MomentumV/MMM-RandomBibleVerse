# MMM-RandomBibleVerse
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). This was largely based on [DailyBibleVerse](https://github.com/arthurgarzajr/MMM-DailyBibleVerse) by [Arthur Garza](https://github.com/arthurgarzajr/). It will display random verses from https://dailyverses.net/. You can change the version of the verse in the config file. Here is a list of the supported Bible versions: ['ESV','NIV','KJV','NKJV']

## Installation
1. Navigate into your MagicMirror's `modules` folder
2. Execute `git clone https://github.com/MomentumV/MMM-RandomBibleVerse`
3. Navigate to newly created folder `MMM-RandomBibleVerse`
4. Execute `npm install`

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-RandomBibleVerse',
		position: 'bottom_bar',	// This can be any of the regions. Best result is in the bottom_bar as verses can take multiple lines.
		config: {
			version: 'ESV', // This can be changed to any of ['ESV','NIV','KJV','NKJV']
			interval: 20,  // default is 60 minutes between verse updates
	    size: 'large' // default value is medium, but can be changed.
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>version</code></td>
			<td>Here is a list of the supported Bible versions:  ['ESV','NIV','KJV','NKJV']
      		<br/>
The language of the Bible reference, i.e. name of the book, is determined by the global <code>language</code> parameter in your config
			</td>
		</tr>
		<tr>
			<td><code>size</code></td>
			<td>Default size is medium but it can be overriden with <code>xsmall</code>, <code>small</code> or <code>large</code>.</td>
		</tr>
		<tr>
			<td><code>interval</code></td>
			<td><i>Optional</i> Default is 60 minutes, but you can choose a different update interval in minutes </td>
		</tr>
	</tbody>
</table>

## Dependencies
- Access to the internet to download verses from https://dailyverses.net/random-bible-verse/.
- npm package `request`
- npm package `cheerio`

The MIT License (MIT)
=====================

Copyright © 2021 Mordecai Veldt

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
