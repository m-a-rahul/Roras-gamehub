# Generated by Django 3.0.3 on 2020-04-29 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameapp', '0012_auto_20200428_2309'),
    ]

    operations = [
        migrations.CreateModel(
            name='Choice1',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mode1', models.BooleanField()),
                ('mode2', models.BooleanField()),
                ('mode3', models.BooleanField()),
            ],
        ),
    ]
