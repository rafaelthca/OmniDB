# Generated by Django 3.0.8 on 2020-07-21 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OmniDB_app', '0017_monunits_monunitsconnections'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monunitsconnections',
            name='unit',
            field=models.IntegerField(default=60),
        ),
    ]