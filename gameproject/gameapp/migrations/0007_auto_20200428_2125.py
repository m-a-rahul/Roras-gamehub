# Generated by Django 3.0.3 on 2020-04-28 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameapp', '0006_auto_20200428_2041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfeedback',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
