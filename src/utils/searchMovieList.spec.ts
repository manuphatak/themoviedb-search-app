import { buildMovieListIndex, Movie } from './searchMovieList';

interface TestMovie extends Movie {
  title: string;
}

describe('given a list of movies', () => {
  const movieList: TestMovie[] = [
    {
      title: 'Thor: Ragnarok',
      overview:
        'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his home-world and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.',
    },
    {
      title: 'Spider-Man: Homecoming',
      overview:
        'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.',
    },
    {
      title: 'Guardians of the Galaxy Vol. 2',
      overview:
        "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage.",
    },
    {
      title: 'Logan',
      overview:
        "In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan's attempts to hide from the world and his legacy are upended when a young mutant arrives, pursued by dark forces.",
    },
    {
      title: 'Doctor Strange',
      overview:
        'After his career is destroyed, a brilliant but arrogant surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil.',
    },
    {
      title: 'X-Men: Apocalypse',
      overview:
        "After the re-emergence of the world's first mutant, world-destroyer Apocalypse, the X-Men must unite to defeat his extinction level plan.",
    },
    {
      title: 'Captain America: Civil War',
      overview:
        'Following the events of Age of Ultron, the collective governments of the world pass an act designed to regulate all superhuman activity. This polarizes opinion amongst the Avengers, causing two factions to side with Iron Man or Captain America, which causes an epic battle between former allies.',
    },
    {
      title: 'Deadpool',
      overview:
        'Deadpool tells the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
    },
    {
      title: 'Fantastic Four',
      overview:
        'Four young outsiders teleport to a dangerous universe, which alters their physical form in shocking ways. Their lives irrevocably upended, the team must learn to harness their daunting new abilities and work together to save Earth from a former friend turned enemy.',
    },
    {
      title: 'Ant-Man',
      overview:
        'Armed with the astonishing ability to shrink in scale but increase in strength, master thief Scott Lang must embrace his inner-hero and help his mentor, Doctor Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.',
    },
  ];

  const searchMovieList = buildMovieListIndex(movieList);

  describe('when searching a unique word', () => {
    const input = 'thor';

    it('returns a single matching movie', () => {
      expect(searchMovieList(input).map((movie) => movie.title)).toEqual([
        'Thor: Ragnarok',
      ]);
    });
  });

  describe('when searching a common word', () => {
    const input = 'the';

    it('returns a list of matching movies', () => {
      expect(searchMovieList(input).map((movie) => movie.title)).toEqual([
        'Thor: Ragnarok',
        'Spider-Man: Homecoming',
        'Guardians of the Galaxy Vol. 2',
        'Logan',
        'Doctor Strange',
        'X-Men: Apocalypse',
        'Captain America: Civil War',
        'Deadpool',
        'Fantastic Four',
        'Ant-Man',
      ]);
    });
  });

  describe('when searching an uppercase target with lowercase input', () => {
    const input = 'ultron';

    it('ignores case', () => {
      expect(searchMovieList(input).map((movie) => movie.title)).toEqual([
        'Captain America: Civil War',
      ]);
    });
  });

  describe('when searching uppercase input', () => {
    const input = 'ULTRON';

    it('ignores case', () => {
      expect(searchMovieList(input).map((movie) => movie.title)).toEqual([
        'Captain America: Civil War',
      ]);
    });
  });

  describe('when receiving an empty string', () => {
    const input = '';

    it('return everything', () => {
      expect(searchMovieList(input).map((movie) => movie.title)).toEqual(
        movieList.map((movie) => movie.title)
      );
    });
  });
});
