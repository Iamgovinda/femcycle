# Generated by Django 3.2.11 on 2024-10-17 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_rename_predicted_next_ovulation_userdata_predicted_next_ovulation_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='predicted_next_mensuration_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userdata',
            name='remaining_days',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userdata',
            name='status',
            field=models.CharField(choices=[('GOOD', 'GOOD'), ('BAD', 'BAD')], default='GOOD', max_length=10),
        ),
    ]
