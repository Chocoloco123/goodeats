"""added back everything from state down

Revision ID: b4f9286b09bb
Revises: 6c315589aa1b
Create Date: 2021-12-16 16:35:33.103652

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b4f9286b09bb'
down_revision = '6c315589aa1b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('zipcode', sa.Integer(), nullable=False))
    op.add_column('restaurants', sa.Column('lat', sa.String(), nullable=True))
    op.add_column('restaurants', sa.Column('lng', sa.String(), nullable=True))
    op.add_column('restaurants', sa.Column('stars', sa.Integer(), nullable=True))
    op.add_column('restaurants', sa.Column('review_count', sa.Integer(), nullable=True))
    op.add_column('restaurants', sa.Column('categoryId', sa.Integer(), nullable=True))
    op.add_column('restaurants', sa.Column('hours', sa.Text(), nullable=False))
    op.add_column('restaurants', sa.Column('ownerId', sa.Integer(), nullable=True))
    op.add_column('restaurants', sa.Column('priceRating', sa.Integer(), nullable=False))
    op.add_column('restaurants', sa.Column('phoneNumber', sa.String(length=15), nullable=True))
    op.add_column('restaurants', sa.Column('websiteUrl', sa.String(), nullable=True))
    op.add_column('restaurants', sa.Column('imageUrl', sa.String(), nullable=False))
    op.add_column('restaurants', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.add_column('restaurants', sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    op.create_foreign_key(None, 'restaurants', 'users', ['ownerId'], ['id'])
    op.create_foreign_key(None, 'restaurants', 'categories', ['categoryId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'restaurants', type_='foreignkey')
    op.drop_constraint(None, 'restaurants', type_='foreignkey')
    op.drop_column('restaurants', 'updated_at')
    op.drop_column('restaurants', 'created_at')
    op.drop_column('restaurants', 'imageUrl')
    op.drop_column('restaurants', 'websiteUrl')
    op.drop_column('restaurants', 'phoneNumber')
    op.drop_column('restaurants', 'priceRating')
    op.drop_column('restaurants', 'ownerId')
    op.drop_column('restaurants', 'hours')
    op.drop_column('restaurants', 'categoryId')
    op.drop_column('restaurants', 'review_count')
    op.drop_column('restaurants', 'stars')
    op.drop_column('restaurants', 'lng')
    op.drop_column('restaurants', 'lat')
    op.drop_column('restaurants', 'zipcode')
    # ### end Alembic commands ###
