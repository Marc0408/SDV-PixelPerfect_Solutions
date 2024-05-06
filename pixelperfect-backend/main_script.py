from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter


def main():
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument("-p", "--path", default="", type=str, help="Filepath to folder with screenshots")
    args = vars(parser.parse_args())
    filepath = args["path"]
    
    return 0


if __name__ == "__main__":
    main()