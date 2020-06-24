
# coding: utf-8

import pandas as pd
import json
import click
import os


# wd = sys._MEIPASS
wd = os.path.dirname(os.path.realpath(__file__))

@click.command()
@click.argument('input_path', nargs=1, type=click.Path(exists=True))
def main(input_path):
    # try:
        ### pre-load nationality-countryname table and geo-coordinate table

        # read country name-nationality table
        country_table = pd.read_csv(os.path.join(wd, 'data/demonyms.csv'), names=['Nationality', 'Country'])


        # read country coordinate data
        with open(os.path.join(wd,'data/countries.json'), 'r') as fin:
            country_coord = json.load(fin)

        country_coord_list = []
        for i in country_coord:
            country_coord_list.append([i['name'], i['country_code'], i['latlng'][0], i['latlng'][1], i['timezones'][0]])

        country_coord_df = pd.DataFrame(country_coord_list, columns=['Country', 'country_code', 'lat', 'lng', 'timezone'])
        

        ### process student files

        # the folder of files
        fpath = os.path.abspath(input_path)

        abbreviations = []
        programs = []


        # walk the path
        for fstudents in os.scandir(fpath):

            df = pd.read_csv(fstudents,encoding='iso-8859-1')


            # merge geo info into students
            students = df.loc[:,['Nationality', 'Abbreviation']]
            students = pd.merge(students, country_table, how='left', on='Nationality')
            students = pd.merge(students, country_coord_df, how='left', on='Country')
            students = students[students.Country.notna()]
            students = students[students.lat.notna()]
            students = students.reset_index(drop=True)

            pname = str(students.loc[0,'Abbreviation'])
            pname = ''.join(e for e in pname if e.isalnum())
            abbreviations.append(pname)
            programs.append(students)


        # Generate the marker file for the map
        with open('marks.js', 'w') as fo:

            # list of abbreviations
            print('var names = [', file=fo)
            for i in abbreviations:
                print("'{}'".format(i), file=fo, end=',')
            print(']', file=fo, end='\n\n')

            i = 0
            for pname in abbreviations:
                marks = programs[i].loc[:,['Country', 'lat', 'lng']].to_dict(orient='records')
                print('var {} = ['.format(pname.lower()), file=fo)
                for m in marks:
                    print(m, file=fo, end=',\n')
                print(']', file=fo, end='\n\n')
                i += 1

    # except Exception as e:
    #     print('ERROR:{}'.format(e))


if __name__ == '__main__':
    main()