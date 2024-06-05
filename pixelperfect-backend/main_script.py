from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

import PIL.Image
import constants
import PIL
import statistics
import os
import mysql.connector


def compare_tuple(a, b):
    try:
        for x in range(len(a)-1):
            if a[x] != b[x]:
                return False 
        return True
    except:
        return False


def set_screentag(mydb, cursor, screenid, tagid):
    query = "INSERT INTO `screentag`(`ScreenshotID`, `TagID`) VALUES ('{}','{}')".format(screenid, tagid)
    cursor.execute(query)
    mydb.commit()
    return


def get_screen_id(cursor, path, state): #-1 if not exists
    query = "SELECT * FROM `screenshot` WHERE `Path` = '{}' AND `State` = '{}'".format(path, state)
    cursor.execute(query)
    res = cursor.fetchall()
    if len(res) > 0:
        return res[0][0]
    elif len(res) == 0:
        return -1


def get_tag_id(cursor, tag, value): #-1 if not exists
    query = "SELECT * FROM `tag` WHERE `TagName` = '{}' AND `TagValue` = '{}'".format(tag, value)
    cursor.execute(query)
    res = cursor.fetchall()
    if len(res) > 0:
        return res[0][0]
    elif len(res) == 0:
        return -1

def set_tag_in_db_if_not_exists_otherwise_get_id(mydb, cursor, tag, value):
    id = get_tag_id(cursor, tag, value)
    if id > 0:
        return id
    elif id < 0:
        query = "INSERT INTO `tag` (`TagName`, `TagValue`) VALUES ('{}','{}')".format(tag, value)
        cursor.execute(query)
        mydb.commit()
        return get_tag_id(cursor, tag, value)
    return -1


def get_menue_state(complete_path, img_path):
    im = PIL.Image.open(complete_path)
    rgb_im = im.convert('RGB')
    if "right" in img_path:
        for x in range(len(constants.MENUE_RIGHT_POSITIONS) - 1):
            r, g, b = rgb_im.getpixel(constants.MENUE_RIGHT_POSITIONS[x])
            if compare_tuple((r, g, b), constants.MENUE_RED_ACTIVE): # IF RED
                return x
            elif compare_tuple((r, g, b), constants.MENUE_GREEN_ACTIVE): # IF RED
                return x
    elif "left" in img_path:
        for x in range(len(constants.MENUE_LEFT_POSITIONS) - 1):
            r, g, b = rgb_im.getpixel(constants.MENUE_LEFT_POSITIONS[x])
            if compare_tuple((r, g, b), constants.MENUE_RED_ACTIVE): # IF RED
                return x
            elif compare_tuple((r, g, b), constants.MENUE_GREEN_ACTIVE): # IF RED
                return x
    return -1


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
    
    # Clean DB
    query = "TRUNCATE TABLE `screenshot`"
    cursor.execute(query)
    query = "TRUNCATE TABLE `tag`"
    cursor.execute(query)
    query = "TRUNCATE TABLE `screentag`"
    cursor.execute(query)
    mydb.commit()
    
    # File rename
    print("Renaming bmp files because they have a png header")
    for img_path in os.listdir(path):
        if ".bmp" in img_path:
            complete_path = path + "\\" + img_path
            dst_path = complete_path.split(".")[0] + ".png"
            os.rename(src=complete_path, dst=dst_path)

    # Files in db
    for img_path in os.listdir(path):
        complete_path = path + "\\" + img_path
        complete_path = replaceBackSlashWithDoubleBackSlash(complete_path)
        menue_state = get_menue_state(complete_path, img_path)
        relative_path = getRelativePath(complete_path)
        date_time, side = get_date_time_and_screen_side_from_img_name(img_path)
        if menue_state >= 0:
            set_values_in_database(mydb, cursor, relative_path, constants.STATE_ACTIVE, date_time, side)
            screen_id = get_screen_id(cursor, relative_path, constants.STATE_ACTIVE)
            tag_id = set_tag_in_db_if_not_exists_otherwise_get_id(mydb, cursor, "Menue", menue_state)
            set_screentag(mydb, cursor, screen_id, tag_id)
        else:
            set_values_in_database(mydb, cursor, relative_path, constants.STATE_INACTIVE, date_time, side)
    return


def getRelativePath(path: str):
    path_array = path.split("SDV-PixelPerfect_Solutions\\\\pixelperfect-frontend")
    relative_path = "." + path_array[1]
    return relative_path


def get_date_time_and_screen_side_from_img_name(img_name: str):
    s = img_name.split(".")[0].split("-")
    side = s[1]
    time = s[2:]
    date_time = ""
    for x in range(len(time)-1):
        date_time += time[x] + "-"
    date_time += time[-1]
    side_int = -10
    if "right" in side:
        side_int = constants.SCREEN_RIGHT
    elif "left" in side:
        side_int = constants.SCREEN_LEFT
    elif "perl" in side:
        side_int = constants.SCREEN_MIDDLE
    return date_time, side_int


def replaceBackSlashWithDoubleBackSlash(s : str):
    a = s.split("\\")
    r=""
    for x in range(len(a)-1):
        r = r + a[x] + "\\\\"
    r = r + a[len(a)-1]
    return r


def set_values_in_database(mydb, cursor, path, state, date_time, side):
    """TThis method sets the values in the DB

    Args:
        cursor (mysql coursor): cursor for db
        path (_type_): Path of screenshot
        state (_type_): State value
    """
    query = "INSERT INTO `screenshot` (Path, State, Side, Time) VALUES ('{}', '{}', '{}', '{}');".format(path, state, side, date_time)
    cursor.execute(query)
    mydb.commit()
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