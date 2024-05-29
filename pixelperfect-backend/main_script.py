from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

import PIL.Image
import constants
import PIL
import statistics
import os
import mysql.connector


def get_white_pixel_count(path):
    """This function returns the amount of white pixels from a picture

    Args:
        path (String): Path to image

    Returns:
        int: amount of white pixels in image
    """
    img = PIL.Image.open(path)
    white = (255, 255, 255, 255)
    numwhites= 0
    for pixel in img.getdata():
        if pixel == white: 
            numwhites += 1
    img.close()
    return numwhites


def get_average_from_txt_file(txt_file_path):
    """This Function returns the average value of white pixels in given screenshot paths

    Args:
        txt_file_path (String): Path to text file

    Returns:
        float: average value of white pixels in given screenshot paths
        int: difference between max and min amount of white pixels to get an idea of a good threshold
    """
    txt_file = open(txt_file_path)
    nums = []
    while True:
        line = txt_file.readline().strip()
        if line != "":
            nums.append(get_white_pixel_count(line))
        else:
            break
    min_nums, max_nums = min(nums), max(nums)
    max_min_nums = max_nums-min_nums
    return statistics.mean(nums), max_min_nums


def crawl_dir_and_add_to_database(path):
    """This methods crawls through given file directory and updates the db with analysed values

    Args:
        path (String): Path for directory which this method has to crawl through
    """
    mydb = mysql.connector.connect(
        host=str(constants.host),
        user=str(constants.user),
        password=str(constants.password),
        port=int(constants.port),
        database=str(constants.database)
    )
    cursor = mydb.cursor()

    for img_path in os.listdir(path):        
        complete_path = path + "\\" + img_path
        white_pixel_amount = get_white_pixel_count(complete_path)
        if constants.INACTIVE_WHITE_PIXELS_TOP_BORDER > white_pixel_amount and \
        constants.INACTIVE_WHITE_PIXELS_BOTTOM_BORDER < white_pixel_amount:
            # Inactive State
            # print("Inactive: " + img_path)
            set_values_in_database(cursor, complete_path, constants.STATE_INACTIVE)
        elif constants.ACTIVE_WHITE_PIXELS_TOP_BORDER > white_pixel_amount and \
        constants.ACTIVE_WHITE_PIXELS_BOTTOM_BORDER < white_pixel_amount:
            # Active State
            # print("Active: " + img_path)
            set_values_in_database(cursor, complete_path, constants.STATE_ACTIVE)
        else:
            # Screensaver State
            # print("Screensaver: " + img_path)
            set_values_in_database(cursor, complete_path, constants.STATE_SCREENSAVER)
    mydb.commit()
    return


def replaceBackSlashWithDoubleBackSlash(s : str):
    a = s.split("\\")
    r=""
    for x in range(len(a)-1):
        r = r + a[x] + "\\\\"
    r = r + a[len(a)-1]
    return r


def set_values_in_database(cursor, path, state):
    """TThis method sets the values in the DB

    Args:
        cursor (mysql coursor): cursor for db
        path (_type_): Path of screenshot
        state (_type_): State value
    """
    s = replaceBackSlashWithDoubleBackSlash(path)
    query = "INSERT INTO `screenshot` (Path, State) VALUES ('{}', '{}');".format(s, state)
    cursor.execute(query)
    return


def main():
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument("-p", "--path", default="", type=str, help="Filepath to folder with screenshots")
    args = vars(parser.parse_args())
    
    if args["path"] == "":
        print("No filepath given...")
        return 1
    elif args["path"] == "test":
        pass
    filepath = args["path"]
    crawl_dir_and_add_to_database(filepath)
    return 0


if __name__ == "__main__":
    main()