# oxygen-checkpoints

Create checkpoints of your oxygen state in the builder and revert to any checkpoint anytime.

In the Oxygen Builder. Click on Manage -> Checkpoints. Whenever you add a checkpoint, it will store the current state of your layout.

You can create as many checkpoints as you require. However, huge number of checkpoints on large layouts will eat a lot of memory, so use wisely.

Warning: These checkpoints won't persist, if you refresh the builder. Neither are these saved to the database. These are meant only for the current editing session only.

As of now, the parameters of css classes, selectors, stylesheets and global settings are not managed. Only the page layout is supported. The others will be covered during the upcoming versions.
