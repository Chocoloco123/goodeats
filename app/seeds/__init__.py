from flask.cli import AppGroup
from .users import seed_users, undo_users
from .restaurants import seed_restaurants, undo_restaurants
from .reviews import seed_reviews, undo_reviews
from .categories import seed_categories, undo_categories
from .images import seed_images, undo_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Be sure to seed the most imoportant ones first
    seed_users()
    seed_categories()
    # seed_restaurants()
    seed_reviews()
    seed_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # remember, order is important here! Doesn't need to be the same as the seed above
    undo_images()
    undo_reviews()
    # undo_restaurants()
    undo_categories()
    undo_users()
    # Add other undo functions here
