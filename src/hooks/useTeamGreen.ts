import { useQuery } from '@tanstack/react-query';

export interface TeamGreenData {
  success: boolean;
  data: {
    id: number;
    mainPage: {
      cta: Array<{
        href: string;
        text: string;
      }>;
      keys: Array<{
        title: string;
        button: {
          href: string;
          text: string;
        };
        description: string;
      }>;
      title: string;
      quote1: {
        text: string;
        highlighted: string;
      };
      quote2: {
        text: string;
        highlighted: string;
      };
      description: {
        text: string;
        highlighted: string;
      };
      subHeadline: string;
    };
    whoWeAreModal: {
      img: {
        alt: string;
        src: string;
        highlighted: string;
      };
      quote: {
        text: string;
        highlighted: string;
      };
      title: string;
      title2: string;
      description: string;
      description2: string;
    };
    ourLeadershipPhilosophy: {
      icon: any[];
      quote: {
        text: string;
        highlighted: string;
        highlightedText: string;
      };
      title: string;
      keyPoints: string[];
      qualities: string[];
      description: string;
    };
    meetTeam: {
      quote: {
        text: string;
        text1: string;
        text2: string;
        highlighted: string;
        highlightedText: string;
      };
      title: string;
      jobTitle: any[];
      description: string;
      designations: Array<{
        name: string;
        members: Array<{
          img: string;
          name: string;
          position: string;
        }>;
      }>;
    };
    ourCultureActionModal: {
      img: string;
      keys: any[];
      quote: string;
      title: string;
      keypoint: string[];
      description: string;
      quoteHighlighted: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

const fetchTeamGreen = async (): Promise<TeamGreenData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/empower/team-green');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch team green data: ${response.status}`);
  }
  
  return response.json();
};

export const useTeamGreen = () => {
  return useQuery({
    queryKey: ['team-green'],
    queryFn: fetchTeamGreen,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
};