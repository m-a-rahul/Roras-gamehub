# Generated by Django 3.0.3 on 2020-04-28 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameapp', '0008_visitors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitors',
            name='ipAddress',
            field=models.TextField(),
        ),
    ]
