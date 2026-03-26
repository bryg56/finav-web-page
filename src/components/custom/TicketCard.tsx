import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface props {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  buttonClicked: (id: string) => void;
}

export const TicketCard = (props: props) => {
  return (
    <div>
      <Card className="relative overflow-hidden size-100">
        <CardHeader className="text-center">
          <CardTitle className="text-purple-900 text-3xl">
            {props.title}
          </CardTitle>

          <CardDescription>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/finav-web.firebasestorage.app/o/assets%2FLINEALARGACONVOCATORIA.png?alt=media&token=b327eb82-c912-4265-b01c-582204fc6f2b"
              alt=""
              className="mx-auto"
            />
          </CardDescription>
        </CardHeader>

        {/* CONTENIDO */}
        <CardContent>
          <p className="mt-1 text-center">{props.description}</p>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="rounded-full! text-sm border-purple-900 bg-purple-900 text-white hover:bg-purple-300"
            disabled={!props.isActive}
            onClick={() => props.buttonClicked(props.id)}
          >
            {!props.isActive ? "PRÓXIMAMENTE" : "VER MÁS"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
