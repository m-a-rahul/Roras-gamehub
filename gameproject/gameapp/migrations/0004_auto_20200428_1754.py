# Generated by Django 3.0.3 on 2020-04-28 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gameapp', '0003_auto_20200428_1733'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userfeedback',
            old_name='feedback',
            new_name='voice',
        ),
    ]
